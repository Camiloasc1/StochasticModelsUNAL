import numpy as np

M = np.array([
    [0., 0., 0.1, 0.2, 0.4, 0.3],
    [0., 0., 0.1, 0.2, 0.4, 0.3],
    [0.3, 0.4, 0.3, 0., 0., 0.],
    [0.1, 0.2, 0.4, 0.3, 0., 0.],
    [0., 0.1, 0.2, 0.4, 0.3, 0.],
    [0., 0., 0.1, 0.2, 0.4, 0.3],
])

print("5 days")
M = np.linalg.matrix_power(M, 5)
m = np.sum(M, axis=1)
print(M)
print(m)

M = np.array([
    [0., 0., 0.1, 0.2, 0.4, 0.3],
    [0., 0., 0.1, 0.2, 0.4, 0.3],
    [0.3, 0.4, 0.3, 0., 0., 0.],
    [0.1, 0.2, 0.4, 0.3, 0., 0.],
    [0., 0.1, 0.2, 0.4, 0.3, 0.],
    [0., 0., 0.1, 0.2, 0.4, 0.3],
])

print("stable")
M = np.linalg.matrix_power(M, 65536)
m = np.sum(M, axis=1)
print(M)
print(m)

M = np.array([
    [1. / 6., 1. / 2., 1. / 3., 0.],
    [0., 2. / 3., 0., 1. / 3.],
    [0., 0., 1. / 2., 1. / 2.],
    [0., 0., 0., 1.],
])

print("stable")
M = np.linalg.matrix_power(M, 65536)
m = np.sum(M, axis=1)
print(M)
print(m)
