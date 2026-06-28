# SCALE.md

**Question:** 
*Registrations open on Friday at 6:00 PM. We expect 2,000 students to hit the registration endpoint within the first 60 seconds. The server has 1 GB of RAM. What is one concrete strategy — implemented or explained in detail — that you would use to keep the server stable during this spike?*

---

## The Concrete Strategy: API Rate Limiting (Implemented)

To keep the 1GB RAM server from being overwhelmed by the burst of 2000 students in 60 seconds (around ~33 req/sec), I have implemented **API Rate Limiting** directly into the Express application using the `express-rate-limit` package.

### How it is Implemented in the Codebase

In `src/app.ts`, the following middleware is applied globally before any requests reach the route handlers:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 50,                 // Limit each IP to 50 requests per window
  message: {
    status: 'fail',
    message: 'Too many requests from this IP, please try again after a minute'
  }
});

app.use(limiter);
```

### Why This Keeps the Server Stable

1. **Memory Protection (1GB Constraint):**
   Node.js creates an object in memory for every incoming request. If 2000 users all rapidly refresh the page or run scripts to grab a spot, the server could receive 10,000+ requests in a few seconds. The rate limiter drops excessive requests immediately before parsing heavy JSON bodies, checking JWTs, or invoking database logic, ensuring the memory heap never hits the 1GB ceiling.

2. **Database Connection Pool Exhaustion:**
   Prisma manages a connection pool to PostgreSQL. If hundreds of users hit the `/registration` endpoint simultaneously, the connection pool will queue the requests. If the queue gets too long, requests timeout, or the database process crashes due to context-switching overhead. By rate-limiting at the Express layer, we enforce a manageable trickle of requests (e.g., 50 per IP) that the Prisma connection pool can comfortably handle.

3. **Preventing Malicious Abuse (DDoS/Bots):**
   In highly anticipated university events, students often write scripts to guarantee a ticket. Rate limiting ensures that a single IP address cannot monopolize the server's resources. It distributes the server's limited 1GB RAM and CPU time fairly among all incoming real connections.

### Secondary Defensive Strategies Implemented

Alongside Rate Limiting, the backend leverages several other structural choices to ensure stability:
- **Stateless Architecture:** No session data is stored in RAM. Authentication is handled purely via JWTs.
- **Fail-Fast Validation:** Zod validates incoming payloads before any DB queries are fired, rejecting malformed requests at the earliest layer.
- **Database Indexing:** Crucial fields like `email`, `studentId`, and `registrationId` have unique indexes (`@unique`), ensuring that lookups execute in `O(log N)` time rather than triggering full table scans that lock the database.
