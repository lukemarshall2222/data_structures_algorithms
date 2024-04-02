""" Binary search tree in python. """

from typing import Any, Union, Iterator


#======================================================================================================================================================================================================
#-------------------------- Tree Node Definition --------------------------------------------------------------------------------------------------------------------------------------------------------
#======================================================================================================================================================================================================

class TreeNode():

    def __init__(self, val=None, parent : 'TreeNode'=None, left : 'TreeNode'=None, right : 'TreeNode'=None) -> None:
        self.__val = val
        self.__parent = parent
        self.__right = right
        self.__left = left

    #-------------- Getter Methods ------------------------------------------------------------------------------------------------

    def get_val(self):
        return self.__val
    
    def get_parent(self):
        return self.__parent
    
    def get_right(self):
        return self.__right
    
    def get_left(self):
        return self.__left
    
    #-------------- Setter Methods ------------------------------------------------------------------------------------------------
    
    def set_val(self, val: Any):
        self.__val = val

    def set_parent(self, parent: 'TreeNode'):
        self.__parent = parent

    def set_right(self, right: 'TreeNode'):
        self.__right = right

    def set_left(self, left: 'TreeNode'):
        self.__left = left


#======================================================================================================================================================================================================
#-------------------------- BST Definition --------------------------------------------------------------------------------------------------------------------------------------------------------
#======================================================================================================================================================================================================

class BST():

    INORDER = 1
    PREORDER = 2
    POSTORDER = 3

    def __init__(self, head_val: Any=None):
        if (head_val is not None):
            self.__head = TreeNode(val=head_val)
        else:
            self.__head = None

    def insertNode(self, val) -> None:
        newNode = TreeNode(val)
        if (self.isEmpty()):
            self.__head = newNode
            return
        
        curr = parent = self.__head
        while curr is not None:
            parent = curr
            curr = curr.get_right() if val > curr.get_val() else curr.get_left()

        if parent.get_val() < val:
            parent.set_right(newNode)
        else:
            parent.set_left(newNode)
        
        newNode.set_parent(parent)

    def search(self, val: Any) -> Union[TreeNode, None]:
        curr = self.__head
        while curr is not None:
            if curr.get_val() == val:
                return curr
            curr = curr.get_right() if curr.get_val() < val else curr.get_left()
        
        return None
    
    def deleteNode(self, val: Any) -> TreeNode:
        if val is None or self.isEmpty():
            return None
        
        curr = self.__head
        left = True
        while curr is not None:
            if curr.get_val() == val:
                break
            elif curr.get_val() < val:
                curr = curr.get_right()
                left = False
            else:
                curr = curr.get_left()
                left = True
        else:
            return None
        
        if (curr.get_left() is None) and (curr.get_right() is None):
            if left:
                curr.get_parent().set_left(None)
            else:
                curr.get_parent().set_right(None)

        elif (curr.get_left() is not None) or (curr.get_right() is not None):
            child = curr.get_left() if curr.get_left() is not None else curr.get_right()
            grandparent = curr.get_parent()
            if curr == grandparent.get_right():
                grandparent.set_right(child)
            else:
                grandparent.set_left(child)
            child.set_parent(grandparent)
        
        else:
            successor = self.successor(curr)
            tmp = successor.get_val()
            successor.set_val(curr.get_val())
            curr.set_val(tmp)
            self.deleteNode(val)
        
        return curr


    
    def __iter__(self):
        return self.inorder()
    
    def inorder(self):
        return self.__traverse(self.__head, BST.INORDER)
    
    def preorder(self):
        return self.__traverse(self.__head, BST.PREORDER)
    
    def postorder(self):
        return self.__traverse(self.__head, BST.POSTORDER)

    def __traverse(self, curr: TreeNode, traversal_type: int) -> Iterator:
        if curr is None:
            return
        
        match traversal_type:
            case BST.INORDER:
                yield from self.__traverse(curr.get_left())
                yield curr.get_val()
                yield from self.__traverse(curr.get_right())
            case BST.PREORDER:
                yield curr.get_val()
                yield from curr.get_left()
                yield from curr.get_right()
            case BST.POSTORDER:
                yield from curr.get_left()
                yield from curr.get_right()
                yield curr.get_val() 
    
    def get_max(self, node: Union[TreeNode, None]) -> TreeNode:
        if node is None:
            return None
        curr = node
        while (right := curr.get_right()) is not None:
            curr = right
        else:
            return curr
        
    def get_min(self, node: Union[TreeNode, None]) -> TreeNode:
        if node is None:
            return None
        curr = node
        while (left := curr.get_left()) is not None:
            curr = left
        else:
            return curr
        
    def tree_max(self) -> TreeNode:
        return self.get_max(self.__head)
    
    def tree_min(self) -> TreeNode:
        return self.get_min(self.__head)
    
    def successor(self, node: TreeNode) -> TreeNode:
        if (right := node.get_right()) is not None:
            return self.get_min(right)
        
        curr = node
        parent = node.get_parent()
        while parent is not None and curr == parent.get_right():
            curr = parent
            parent = parent.get_parent()
        return parent
    
    def predecessor(self, node: TreeNode) -> TreeNode:
        if (left := node.get_left()) is not None:
            return self.get_max(left)
        
        curr = node
        parent = node.get_parent()
        while parent is not None and curr == parent.get_left():
            curr = parent
            parent = parent.get_parent()
        return parent
    




    def isEmpty(self):
        return self.__head == None

