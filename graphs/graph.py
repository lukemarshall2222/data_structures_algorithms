"""unweighted nondirectional graph representaion in python"""

from collections import deque

class GraphNode():

    WHITE = 0
    GRAY = 1
    BLACK = 2

    def __init__(self, val: int, *neighbors: 'GraphNode') -> None:
        if not isinstance(val, int):
            raise ValueError("Value is necessary for instantiation of a GraphNode.")
        
        self.__val : int = val
        self.__color : int = GraphNode.WHITE
        self.__neighbors : dict[int, 'GraphNode'] = {}

        for neighbor in neighbors:
            if (val := neighbor.getVal()) in self.__neighbors:
                raise ValueError("Attempt to input repeat value {val} into graph.")
            else:
                self.__neighbors[val] = neighbor

    def addNeighbors(self, *neighbors: list['GraphNode']) -> None:
        for neighbor in neighbors:
            val : int = neighbor.getVal()
            if val in self.__neighbors:
                raise ValueError("Attempt to input repeat value {val} into graph.")
            else:
                self.__neighbors[val] = neighbor
    
    def getNeighbors(self) -> dict[int, 'GraphNode']:
        return 
    
    def getVal(self) -> int:
        return self.__val
    
    def setColor(self, color: int) -> None:
        self.__color = color

    def getColor(self) -> int:
        return self.__color
    

class Graph():

    def __init__(self, root: GraphNode=None) -> None:
        self.root : GraphNode = root
    
    def setRoot(self, root: GraphNode) -> None:
        if not isinstance(root, GraphNode):
            return
        self.root = root

    def BFS(self, val: int) -> GraphNode:
        if self.isEmpty():
            return None
        dq = deque([])
        dq.append(self.root)
        while (len(dq) > 0):
            curr : GraphNode = dq.popleft()
            if curr.getVal() == val:
                return curr
            else:
                curr.setColor(GraphNode.BLACK)

            for node in curr.getNeighbors().values():
                if (node.getColor() == GraphNode.WHITE):
                    node.setColor(GraphNode.GRAY)
                    dq.append(node)
        else:
            return None
        
    def DFS(self, val: int) -> GraphNode:
        pass

    def adjacencyList(self) -> str:
        pass

    def adjacencyTable(self) -> str:
        pass

    def isEmpty(self) -> bool:
        return self.root == None