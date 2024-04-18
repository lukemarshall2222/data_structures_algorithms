"""Red-Black Tree in python"""

from typing import Any
from ..BSTs.py_bst import TreeNode, BST

class RBTnode(TreeNode):

    BLACK = 0
    RED = 1

    def __init__(self, val: int, parent: 'RBTnode', right: 'RBTnode', left: 'RBTnode'):
        super.__init__(val, parent, right, left)
        self.color = RBTnode.BLACK
    
    def set_color(self, color: int):
        self.color = color
    
    def get_color(self):
        return self.color
    
class RBT(BST):

    def __init__(self, head_val: int=None) -> None:
        if head_val is not None:
            self.root = RBTnode(head_val)
        else:
            self.root = None
        self.sentinel: RBTnode = RBTnode(-1)
    
    def __left_rotate(self, curr: RBTnode) -> None:
        rChild: RBTnode = curr.get_right()
        glChild: RBTnode = rChild.get_left()
        parent: RBTnode = curr.get_parent()

        curr.set_right(glChild)
        if glChild != self.sentinel:
            glChild.set_parent(curr)

        rChild.set_parent(parent)
        if parent == self.sentinel:
            self.root = rChild
        elif curr == parent.get_left():
            parent.set_left(rChild)
        else:
            parent.set_right(rChild)

        rChild.set_left(curr)
        curr.set_parent(rChild)

    def __right_rotate(self, curr: RBTnode) -> None:
        lChild: RBTnode = curr.get_left()
        grChild: RBTnode = lChild.get_right()
        parent: RBTnode = curr.get_parent()

        curr.set_left(grChild)
        if grChild != self.sentinel:
            grChild.set_parent(curr)

        lChild.set_parent(parent)
        if parent == self.sentinel:
            self.root = lChild
        elif curr == parent.get_right():
            parent.set_right(lChild)
        else:
            parent.set_left(lChild)
        
        lChild.set_right(curr)
        curr.set_parent(lChild)

    def insertNode(self, newNode: RBTnode) -> None:
        super().insertNode(newNode)
        newNode.set_left(self.sentinel)
        newNode.set_right(self.sentinel)
        if newNode.get_parent() == None:
            newNode.set_parent(self.sentinel)
        self.__insert_fixup()

    def __insert_fixup(self, node: RBTnode) -> None:
        curr: RBTnode = node
        parent: RBTnode = curr.get_parent()
        gParent: RBTnode = parent.get_parent()
        uncle : RBTnode

        while parent.get_color() == RBTnode.RED:
            parent = curr.get_parent()
            gParent = parent.get_parent()
            if parent == gParent.get_left():
                uncle = gParent.get_right()

                if uncle.get_color() == RBTnode.RED:
                    parent.set_color(RBTnode.BLACK)
                    uncle.set_color(RBTnode.BLACK)
                    gParent.set_color(RBTnode.RED)
                    curr = gParent
                else:
                    if curr == parent.get_right():
                        curr = parent
                        self.__left_rotate(curr)
                        parent = curr.get_parent()
                        gParent = parent.get_parent()
                    parent.set_color(RBTnode.BLACK)
                    gParent.set_color(RBTnode.BLACK)
                    self.__right_rotate(gParent)
            else:
                uncle = gParent.get_left()

                if uncle.get_color() == RBTnode.RED:
                    parent.set_color(RBTnode.BLACK)
                    uncle.set_color(RBTnode.BLACK)
                    gParent.set_color(RBTnode.RED)
                    curr = gParent
                else:
                    if curr == parent.get_left():
                        curr = parent
                        self.__right_rotate(curr)
                        parent = curr.get_parent()
                        gParent = parent.get_parent()
                    parent.set_color(RBTnode.BLACK)
                    gParent.set_color(RBTnode.RED)
                    self.__left_rotate(gParent)
        self.root.set_color(RBTnode.BLACK)

    def __transplant(u : RBTnode, v : RBTnode) -> None:
        pass
