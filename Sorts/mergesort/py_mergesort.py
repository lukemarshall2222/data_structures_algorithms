""" Mergesort in python """

from collections import deque

class Mergesort():

    def __init__(self, arr: list[int]=None) -> None:
        if arr is None:
            self.arr : list[int] = []
        else:
            self.arr : list[int] = arr

    def append(self, val: int) -> None:
        self.arr.append(val)
    
    def recursiveMergesort(self):
        if len(self.arr) < 2:
            return
        self.arr = self.recursiveHelper(self.arr)

    def recursiveHelper(self, arr: list[int]) -> list[int]:
        if (length := len(arr)) > 1:
            return self.recursiveMerge(self.recursiveHelper(arr[:(length//2)]), self.recursiveHelper(arr[(length//2):]))
        else:
            return arr
        
    def recursiveMerge(self, arr1: list[int], arr2: list[int]) -> list[int]:
        if len(arr1) == 0:
            return arr2
        elif len(arr2) == 0:
            return arr1
        elif arr1[0] <= arr2[0]:
            return [arr1[0]] + self.recursiveMerge(arr1[1:], arr2)
        else:
            return [arr2[0]] + self.recursiveMerge(arr1, arr2[1:])
        
    def iterMergesort(self):
        Q = deque([[self.arr[i]] for i in range(len(self.arr))])
 
        while len(Q) > 1:
            Q.append(self.iterMerge(Q.popleft(), Q.popleft()))
        
        self.arr = Q.popleft()

    def iterMerge(self, arr1: list[int], arr2: list[int]) -> list[int]:
        res = []
        i = j = 0
        while i < len(arr1) and j < len(arr2):
            if arr1[i] < arr2[j]:
                res.append(arr1[i])
                i += 1
            else:
                res.append(arr2[j])
                j += 1
        
        res.extend(arr1[i:])
        res.extend(arr2[j:])
        return res
