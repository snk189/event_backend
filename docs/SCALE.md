# SCALE.md

**Question:** 
"2000 users hit registration endpoint within 60 seconds using only 1GB RAM."

**Discussion:**

Handling a burst of 2000 registrations in 60 seconds (around ~33 req/sec) on a resource-constrained server (1GB RAM) requires careful optimization. If the system is not well-designed, connection exhaustion, memory bloat, and database locking could cause it to crash.

Here is how the architecture addresses this scenario:

### 1. Stateless APIs
The Express backend relies on JWT tokens for authentication, making the API entirely stateless. We do not store session data in memory. This ensures that the memory footprint per request remains minimal and we can process requests efficiently without exhausting the 1GB RAM.

### 2. Request Validation Before DB Access
Using Zod, we validate all incoming payloads (e.g., email format, required fields) at the middleware layer before the request even reaches the services or database. Invalid requests fail fast, saving precious CPU cycles and database connection resources.

### 3. Idempotent Registration Endpoint
The registration service checks if a student is already registered (by unique `studentId`) before proceeding. The schema enforces uniqueness on `studentId` and `registrationNumber` at the database level. Duplicate requests from the same user (e.g., impatiently clicking "Register" multiple times) won't result in corrupted data or multiple tickets.

### 4. Database Indexing
Our Prisma schema defines `@unique` constraints on heavily queried fields like `email`, `studentId`, `registrationId`, and `registrationNumber`. These automatically create B-Tree indexes in PostgreSQL, ensuring that lookups during the registration and login process execute in logarithmic time `O(log N)` instead of scanning the entire table.

### 5. Efficient Queries and Connection Pooling
Prisma Client maintains a connection pool to PostgreSQL. For 1GB RAM, we must avoid opening too many simultaneous connections which could crash the database. We would configure Prisma's connection pool size appropriately (e.g., `connection_limit=10`) within the `DATABASE_URL`. This queues database queries at the Prisma level rather than dropping connections.

### 6. Rate Limiting (Recommended)
While not implemented in this MVP, adding a rate limiter (e.g., using `express-rate-limit` with a Redis instance) is critical for a production system to prevent abuse (like DDoS) and ensure fair resource allocation among users.

### 7. Queue-Based Processing (For Scaling Further)
If the tasks involved heavy processing (like sending a confirmation email or generating a complex PDF ticket synchronously), the 1GB RAM server would quickly bog down. The solution is to offload these heavy tasks to a background queue (e.g., RabbitMQ or BullMQ). The registration endpoint would simply acknowledge the request, write to DB, and a worker process would generate the QR/email asynchronously.

### 8. Horizontal Scaling
If traffic grows beyond 2000 users/minute persistently, a 1GB RAM monolith is not sufficient. Because the app is stateless (JWT + Postgres), we can trivially deploy multiple instances of the Node.js server behind a load balancer (like NGINX or AWS ALB) to scale horizontally.
