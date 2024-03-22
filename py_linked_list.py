"""Doubly linked list in Python"""

class Node():
    def __init__(self, val=0, prev=None, next=None) -> None:
        self.__prev = prev
        self.__next = next
        self.__val = val
    
    def set_prev(self, new_prev: "Node") -> None:
        self.__prev = new_prev

    def set_next(self, new_next: "Node"):
        self.__next = new_next

    def set_val(self, new_val: int):
        self.__val = new_val
    
    def get_prev(self):
        return self.__prev
    
    def get_next(self):
        return self.__next
    
    def get_val(self):
        return self.__val
    
    def __eq__(self, other: "Node") -> bool:
        return self.__val == other.get_val() and self.__next is other.get_next() and self.__prev is self.get_prev()


class Linked_list():
    def __init__(self, head=None) -> None:
        self.__head = head
    
    # ---------- Insert Methods -----------------------------------------------------------------------------------------------------------------
    
    def insert_head(self, new_head: Node) -> None:
        if not self.isEmpty():
            self.__head.set_prev(new_head)
        new_head.set_next(self.__head)
        self.__head = new_head

    def insert_tail(self, new_tail: Node):
        if self.isEmpty():
            self.insert_head(new_tail)
            return
        curr = self.__head
        while (next := curr.get_next() is not None):
            curr = next
        curr.set_next(new_tail)
        new_tail.set_prev(curr)

    def insert_before(self, before: Node, new: Node):
        if self.isEmpty():
            self.insert_head(new)
            return
        curr = self.__head
        while (curr.get_next() is not None):
            if curr == before:
                new.set_next(before)
                new.set_prev(before.get_prev())
                before.set_prev(new)
                new.get_prev().set_next(new)
                return
        curr.set_next(new)
        new.set_prev(curr)

    def insert_after(self, after: Node, new: Node) -> None:
        if self.isEmpty():
            self.insert_head(new)
            return
        curr = self.__head
        while (curr.get_next() is not None):
            if curr == after:
                new.set_next(curr.get_next())
                new.set_prev(after)
                if curr.get_next() is not None:
                    curr.get_next().set_prev(new)

        curr.set_next(new)
        new.set_prev(after)

    def insert_at_position(self, pos: int, new: Node) -> None:
        if self.isEmpty():
            self.insert_head(new)
            return
        curr = self.__head
        for i in range(pos):
            if (next := curr.get_next()) is not None:
                curr = next
            else:
                self.insert_tail(new)
                return
        self.insert_before(curr)

    # ---------- Delete Methods -----------------------------------------------------------------------------------------------------------------

    def delete_node(self, out: Node) -> None:        
        curr = self.__head
        while curr is not None:
            if curr == out:
                if curr == self.__head:
                    self.__head = curr.get_next()
                if curr.get_prev() is not None:
                    curr.get_prev().set_next(curr.get_next)
                if curr.get_next() is not None:
                    curr.get_next().set_prev(curr.get_prev())
                    break
            else:
                curr = curr.get_next()

    def delete_val(self, val: int) -> None:
        curr = self.__head
        while curr is not None:
            if curr.get_val() == val:
                if curr == self.__head:
                    self.__head = curr.get_next()
                if curr.get_prev() is not None:
                    curr.get_prev().set_next(curr.get_next())
                if curr.get_next() is not None:
                    curr.get_next().set_prev(curr.get_prev())
            else:
                curr = curr.get_next()
    
    def pop(self) -> Node:
        if self.isEmpty():
            return None
        
        tmp = self.__head
        self.__head = tmp.get_next()
        if self.__head is not None:
            self.__head.set_prev(None)
        return tmp
    
    def dequeue(self):
        if self.isEmpty():
            return None
        
        curr = self.__head
        while (next := curr.get_next()) is not None:
            curr = next

        tmp = curr
        if curr == self.__head:
            self.__head = None
        else:
            curr.get_prev().set_next(None)
        return tmp
    
    def delete_pos(self, val: int) -> None:
        curr = self.__head
        for i in range(val-1):
            if (next := curr.get_next()) is not None:
                curr = next
            else:
                return
        if curr == self.__head:
            self.__head = curr.get_next()
        if curr.get_prev() is not None:
            curr.get_prev().set_next(curr.get_next())
        if curr.get_next() is not None:
            curr.get_next().set_prev(curr.get_prev)

    # ---------- Traversal Methods -----------------------------------------------------------------------------------------------------------------
    
    def print_list(self):
        curr = self.__head
        while curr is not None:
            print(curr.get_val())
    
    def search(self, val: int) -> Node:
        curr = self.__head
        while curr is not None:
            if curr.get_val() == val:
                return curr
        else:
            return None
        
    # ---------- Modification Methods -----------------------------------------------------------------------------------------------------------------
        
    def update_val(self, old_node: Node, new_val: int) -> Node:
        if self.isEmpty():
            return
        
        curr = self.__head
        while curr is not None:
            if curr == old_node:
                old_node.set_val(new_val)
            else:
                curr = curr.get_next()
        
    def reverse_list(self):
        curr = self.__head
        while curr is not None:
            tmp = curr.get_next()
            curr.set_next(curr.get_prev())
            curr.set_prev(tmp)
            curr = curr.get_prev()

    # ---------- Utility Methods -----------------------------------------------------------------------------------------------------------------

    def isEmpty(self):
        return self.__head == None
    
    def clear_list(self) -> None:
        curr = self.__head
        while curr is not None:
            tmp = curr
            curr = curr.get_next()
            del tmp
        self.__head = None

    def __len__(self):    
        length = 0
        curr = self.__head
        while curr is not None:
            length += 1
            curr = curr.get_next()
        
        return length

