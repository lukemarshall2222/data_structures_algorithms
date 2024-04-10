""" Binary search tree in python. """

from typing import Any, Union, Iterator
from collections import deque


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
    LEVELORDER = 4

    # Constructor:
    def __init__(self, head_val: Any=None):
        if (head_val is not None):
            self.__root = TreeNode(val=head_val)
        else:
            self.__root = None

    # Insertion:
    def insertNode(self, val) -> None:
        newNode = TreeNode(val)
        if (self.isEmpty()):
            self.__root = newNode
            return
        
        curr = parent = self.__root
        while curr is not None:
            parent = curr
            curr = curr.get_right() if val > curr.get_val() else curr.get_left()

        if parent.get_val() < val:
            parent.set_right(newNode)
        else:
            parent.set_left(newNode)
        
        newNode.set_parent(parent)

    # Search:
    def search(self, val: Any) -> Union[TreeNode, None]:
        curr = self.__root
        while curr is not None:
            if curr.get_val() == val:
                return curr
            curr = curr.get_right() if curr.get_val() < val else curr.get_left()
        
        return None
    
    # Deletion:
    def deleteNode(self, val: Any) -> None:
        if val is None or self.isEmpty():
            return None
        
        curr = self.__root
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
                
        if (curr.get_left() is None) and (curr.get_right() is None): # Case 1: node has no children
            if (parent := curr.get_parent()) == None:
                self.__root = None
            elif left: 
                parent.set_left(None)
            else:
                parent.set_right(None)
        elif (((curr.get_left() is not None) or (curr.get_right() is not None)) 
                and (curr.get_right() != curr.get_left())): # Case 2: node has one child
            child = curr.get_left() if curr.get_left() is not None else curr.get_right()
            grandparent = curr.get_parent()
            if grandparent is None:
                self.__root = child
            elif curr == grandparent.get_right():
                grandparent.set_right(child)
            else:
                grandparent.set_left(child)
            child.set_parent(grandparent)
        else:
            successor = self.successor(curr)
            tmpVal = successor.get_val()
            successor.set_val(curr.get_val())
            curr.set_val(tmpVal)
            self.deleteNode(val)
        
    
    # Find successor:
    def successor(self, node: TreeNode) -> TreeNode:
        if (right := node.get_right()) is not None:
            return self.get_min(right)
        
        curr = node
        parent = node.get_parent()
        while parent is not None and curr == parent.get_right():
            curr = parent
            parent = parent.get_parent()
        return parent
    
    # Find predecessor
    def predecessor(self, node: TreeNode) -> TreeNode:
        if (left := node.get_left()) is not None:
            return self.get_max(left)
        
        curr = node
        parent = node.get_parent()
        while parent is not None and curr == parent.get_left():
            curr = parent
            parent = parent.get_parent()
        return parent
    
    # Tree Sort:
    def treeSort(self) -> list[Any]:
        return [val for val in self.inorder()]

    # --------------------------- Iterator Methods ----------------------------------------------------------------------------------------------------

    # Iterator:
    def __iter__(self):
        return self.inorder()
    
    # inorder iterative traversal:
    def inorder(self):
        return self.__traverse(self.__root, BST.INORDER)
    
    # preorder iterative traversal:
    def preorder(self):
        return self.__traverse(self.__root, BST.PREORDER)
    
    # postorder iterative traversal:
    def postorder(self):
        return self.__traverse(self.__root, BST.POSTORDER)

    # Iternal traversal tool
    def __traverse(self, curr: TreeNode, traversal_type: int) -> Iterator:
        if curr is None:
            return
        
        match traversal_type:
            case BST.INORDER:
                yield from self.__traverse(curr.get_left(), traversal_type)
                yield curr.get_val()
                yield from self.__traverse(curr.get_right(), traversal_type)
            case BST.PREORDER:
                yield curr.get_val()
                yield from self.__traverse(curr.get_left(), traversal_type)
                yield from self.__traverse(curr.get_right(), traversal_type)
            case BST.POSTORDER:
                yield from self.__traverse(curr.get_left(), traversal_type)
                yield from self.__traverse(curr.get_right(), traversal_type)
                yield curr.get_val() 
            case BST.LEVELORDER:
                dq = deque([])
                dq.append(curr)
                while len(dq) > 0:
                    node = dq.popleft()

                    if ((left := node.get_left()) != None):
                        node.append(left)

                    if ((right := node.get_right()) != None):
                        node.append(right)

                    yield node.get_val()
    
    # --------------------------- Utility Methods ----------------------------------------------------------------------------------------------------

    # Subtree maximum
    def get_max(self, node: Union[TreeNode, None]) -> TreeNode:
        if node is None:
            return None
        curr = node
        while (right := curr.get_right()) is not None:
            curr = right
        else:
            return curr
        
    # Substree minimum
    def get_min(self, node: Union[TreeNode, None]) -> TreeNode:
        if node is None:
            return None
        curr = node
        while (left := curr.get_left()) is not None:
            curr = left
        else:
            return curr
        
    # BST maximum
    def tree_max(self) -> TreeNode:
        return self.get_max(self.__root)
    
    # BST minimum
    def tree_min(self) -> TreeNode:
        return self.get_min(self.__root)
    
    
    # emptiness checker:
    def isEmpty(self):
        return self.__root == None
    
    # height calculator:
    def height(self, node: TreeNode) -> int:
        if node is None:
            return -1
        else:
            return 1 + max(self.height(node.get_left()), self.height(node.get_right()))
        
    # number of nodes in a subtree calculator:
    def __population(self, node: TreeNode) -> int:
        if node is None:
            return 0
        else:
            return 1 + self.__population(node.get_left()) + self.__population(node.get_right())

    # number of nodes in the BST calculator    
    def tree_population(self):
        return self.__population(self.__root)
