"""unweighted nondirectional graph representaion in python"""

from collections import deque
from prettytable import prettytable

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
    

class NodeGraph():

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

    def isEmpty(self) -> bool:
        return self.root == None
    
class LinkedListnode():
    def __init__(self, name: str, next: 'LinkedListnode') -> None:
        self.__name = name
        self.__next = next

    def getName(self):
        return self.__name
    
    def getNext(self):
        return self.__next
    
    def setNext(self, next: 'LinkedListnode'):
        self.__next = next
    
class SetGraph():

    def __init__(self, Vertices: set[str], Edges: set[set[str]]):
        self.__vertices = Vertices
        self.__edges = Edges
        for edge in self.__edges:
            if len(edge) != 2:
                raise AttributeError(f"edge {edge} does not meet criteria for an edge, the set must contain two edges.")
            for vertex in edge:
                if vertex not in self.__vertices:
                    self.__vertices.add(vertex)
    
    def getVertices(self):
        return self.__vertices
    
    def getEdges(self):
        return self.__edges
    
    def adjacencyDict(self) -> dict[str, set[str]]:
        adjacencies : dict[str, set[str]] = {vertex : set() for vertex in self.__vertices}
        for edge in self.__edges:
            vertex1, vertex2 = tuple(edge)
            if vertex1 not in adjacencies or vertex2 not in adjacencies:
                raise KeyError(f"""Attempt made to access a nonexistent vertex in adjacencies dict in adjacencyDict function 
                                  based on edge which contains the vertices {vertex1, vertex2}""")
            adjacencies[vertex1].add(vertex2)
            adjacencies[vertex2].add(vertex1)
        return adjacencies
    
    def adjacencyList(self) -> list[LinkedListnode]:
        adjacencyDict : dict[str, set[str]] = self.adjacencyDict()
        adjacencyList : list[LinkedListnode] = []
        for vertex, adjacencies in adjacencyDict.items():
            head : LinkedListnode = LinkedListnode(vertex)
            curr : LinkedListnode = head
            for vert in adjacencies:
                curr.setNext(LinkedListnode(vert))
                curr = curr.getNext()
            adjacencyList.append(head)

        return adjacencyList
    
    def adjacencyTable(self) -> list[list[int]]:
        vertices : list[str] = sorted(list(self.__vertices))
        vertexIndices = {vertex : index for index, vertex in enumerate(vertices)}
        adjacencyDict : dict[str, set[str]] = self.adjacencyDict()
        adjacencyTable : list[list[int]] = [[0 for _ in range(len(vertices))] 
                                            for _ in range(len(vertices))]
        for vertex in vertices:
            for adjacenct in adjacencyDict[vertex]:
                adjacencyTable[vertexIndices[vertex]][vertexIndices[adjacenct]] = 1
        
        return adjacencyTable
