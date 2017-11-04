from math import factorial


class Queue:
    def __init__(self) -> None:
        super().__init__()
        self.la = 0
        self.mu = 0
        self.c = 0

    def __init__(self, la, mu, c) -> None:
        super().__init__()
        self.la = la
        self.mu = mu
        self.c = c

    def r(self):
        return self.la / self.mu

    def rho(self):
        return self.r() / self.c

    def L(self):
        return self.la * self.W()

    def Lq(self):
        return self.la * self.Wq()

    def W(self):
        return self.Wq() + 1 / self.mu

    def Wq(self):
        raise NotImplementedError()

    def Pn(self, n):
        raise NotImplementedError()

    def P0(self):
        raise NotImplementedError()


class MM1(Queue):
    def Wq(self):
        return self.rho() / (self.mu - self.la)

    def P0(self):
        return self.Pn(0)

    def Pn(self, n):
        return (1 - self.rho()) * (self.rho() ** n)


class MMc(Queue):
    def Wq(self):
        return (self.r() ** self.c) / (factorial(self.c) * self.c * self.mu * ((1. - self.rho()) ** 2)) * self.P0()

    def P0(self):
        res = 0.
        for n in range(self.c):
            res += (self.r() ** n) / factorial(n)
        res += (self.r() ** self.c) / (factorial(self.c) * (1. - self.rho()))
        return 1. / res

    def Pn(self, n):
        res = (self.la ** n) / (self.mu ** n) * self.P0()
        if n < self.c:
            return res / factorial(n)
        else:
            return res / (self.c ** (n - self.c)) / factorial(self.c)


# http://www.supositorio.com/rcalc/rcalclite.htm

# 20
print("20")
Q = MM1(8, 15, 1)
print(Q.Wq())

# 19
print()
print("19")
p = 0.55
Q = MMc(35 * p, 10, 3)
W1 = Q.W()
print(Q.Lq())
Q = MMc(35 * (1. - p), 3, 7)
W2 = Q.W()
print(Q.Lq())
Q = MM1(35, 120, 1)
print(Q.W() + p * W1 + (1. - p) * W2)

# 18
print()
print("18")
Q = MMc(30, 12, 5)
print(Q.Wq())
print(Q.Lq())

# 17
print()
print("17")
Q = MM1(15, 18, 1)
print(Q.Lq())
print(Q.Wq())

# 16
print()
print("16")
Q = MMc(1.5, 2, 2)
print(Q.L())
print(Q.W())
W1 = Q.W()
Q = MM1(1.5, 4, 1)
print(Q.L())
print(Q.W())
W2 = Q.W()
C1 = 3
C2 = (C1 * W1 - 2 * W2) / W2
print(C2)
# print(C1 * W1 * 60)
# print((2 + C2) * W2 * 60)
