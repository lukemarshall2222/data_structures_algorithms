"""Couple of basic searches in python"""

class search():

    def __init__(self, arr: list[any]) -> None:
        self.arr : list[any]= arr

    def linear_search(self, val: any) -> int | None:
        for i, item in enumerate(self.arr):
            if item == val:
                return i
        return None
    
    def binary_search(self, val: any) -> int | None:
        self.arr.sort()
        start : int = 0
        end : int = len(self.arr)
        i : int = end//2
        while (self.arr[i] != val):
            if val < self.arr[i]:
                end = i
                i = (end-start)//2
            else:
                start = i
                i =  (end-start)//2 + start   