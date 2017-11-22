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

    def P0(self):
        raise NotImplementedError()

    def Pn(self, n):
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


# 2
print("2)")
Tc = 40
muc = 3600. / Tc

la = 75
p1 = 0.44
p2 = 0.36
p3 = 1. - p1 - p2
p3 = 0.20

la1 = la * p1
la2 = la * p2
la3 = la * p3

T1 = 5 * 60.
T2 = 10 * 60.
T3 = 6 * 60.
mu1 = 3600. / T1
mu2 = 3600. / T2
mu3 = 3600. / T3

Qc = MM1(la, muc, 1)
Q1 = MMc(la1, mu1, 4)
Q2 = MMc(la2, mu2, 6)
Q3 = MMc(la3, mu3, 2)

print(Q1.Lq())
print(Q2.Lq())
print(Q3.Lq())
W = Qc.W() + Q1.W() * p1 + Q2.W() * p2 + Q3.W() * p3
print(W * 60.)

# 3
print("3)")
Ta = 12. * 5 + 1.5 * 60
Tb = 30. * 5 + 1.5 * 60
mua = 3600. / Ta
mub = 3600. / Tb
print(mua)
print(mub)

p = 0.15
la = 100
Q = MM1(la * p, mua, 1)
print(Q.Wq() * 60.)
print(Q.Lq())
Q = MMc(la * (1. - p), mub, 7)
print(Q.Wq() * 60.)
print(Q.Lq())
Q = MM1(35, 120, 1)
