# Assignment 01: TDD Approach for /auth/register Endpoint

## Task
Test case likhna hai jo verify kare ki `/auth/register` endpoint response mein newly created user ki `id` return kare.

---

## TDD Approach: RED → GREEN → REFACTOR

---

## Step 1: RED (Failing Test Likho)

Sabse pehle test likho jo **FAIL** hoga kyunki abhi response mein `id` nahi aa raha:

```typescript
it("should return id of the created user", async () => {
    // Arrange - Test data prepare karo
    const userData = {
        firstName: "Adnan",
        lastName: "karim",
        email: "adnan@gmail.com",
        password: "secret"
    };

    // Act - API call karo
    const response = await request(app).post("/auth/register").send(userData);

    // Assert - Check karo id aaya ya nahi
    expect(response.body).toHaveProperty("id");
});
```

**Test run karo:** `npm test`

**Result:** ❌ FAIL - kyunki `res.status(201).json()` mein kuch return nahi ho raha

---

## Step 2: GREEN (Code Likho jo Test Pass Kare)

Ab `AuthController.ts` mein change karo:

### Before:
```typescript
async register(req: RegisterRequest, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    await this.userService.create({firstName, lastName, email, password});

    res.status(201).json();
}
```

### After:
```typescript
async register(req: RegisterRequest, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    // User create karo aur result lo
    const user = await this.userService.create({firstName, lastName, email, password});

    // Response mein id bhejo
    res.status(201).json({ id: user.id });
}
```

**Test run karo:** `npm test`

**Result:** ✅ PASS

---

## Step 3: REFACTOR (Code Clean Karo)

Agar zaroorat ho toh code optimize karo, lekin functionality same rakho.

---

## Summary Table

| Step | Kya karna hai | Result |
|------|---------------|--------|
| 1. RED | Test likho `expect(response.body).toHaveProperty("id")` | ❌ FAIL |
| 2. GREEN | Controller mein `res.json({ id: user.id })` karo | ✅ PASS |
| 3. REFACTOR | Code clean karo (optional) | ✅ PASS |

---

## Extra Assertions (Optional)

Aap ye bhi check kar sakte ho ki id **number** hai aur **database wale id se match** karta hai:

```typescript
it("should return id of the created user", async () => {
    const userData = {
        firstName: "Adnan",
        lastName: "karim",
        email: "adnan@gmail.com",
        password: "secret"
    };

    const response = await request(app).post("/auth/register").send(userData);

    // Check id exists and is a number
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    // Bonus: Database se verify karo
    const userRepository = connection.getRepository(User);
    const users = await userRepository.find();
    expect(response.body.id).toBe(users[0].id);
});
```

---

## Key Points

1. **TDD mein pehle test likhte hain, phir code**
2. **Test FAIL hona chahiye pehle (RED)**
3. **Minimum code likho jo test pass kare (GREEN)**
4. **Baad mein optimize karo (REFACTOR)**
