/* cpp BST function implementations */ 

#include "cpp_bst.h"

// ===================================================================================================================================
// ------------------ Iterator and iteration related BST member functions ------------------------------------------------------------
// ===================================================================================================================================

/*  Anonymous enum in BST used to asscociate traversal types with integers:
    enum {
        INORDER = 1,
        PREORDER = 2,
        POSTORDER = 3,
        LEVELORDER = 4
    };
*/

// ------------------ Iterator Member Functions --------------------------------------------------------------------------------------

template <typename T>
void BST<T>::Iterator::queueInorder() const {
    /* Enqueues the nodes into nodeDeque through inorder traversal */
    queueUp(tree.getRoot(), tree.INORDER);
}

template <typename T>
void BST<T>::Iterator::queuePreorder() const {
    /* Enqueues the nodes into nodeDeque through preorder traversal */
    queueUp(tree.getRoot(), tree.PREORDER);
}

template <typename T>
void BST<T>::Iterator::queuePostorder() const {
    /* Enqueues the nodes into nodeDeque through postorder traversal */
    queueUp(tree.getRoot(), tree.POSTORDER);
}

template <typename T>
void BST<T>::Iterator::queueLevelorder() const {
    /* Enqueues the nodes into nodeDeque through levelorder traversal */
    queueUp(tree.getRoot(), tree.LEVELORDER);
}

template <typename T>
void BST<T>::Iterator::queueUp(const TreeNode<T>* const node, int traversalType/*=INORDER*/) const {
    /* Iterator helper function implements the actual enqueueing into the deque for each of the traversals.
       At the end of the function the nodeDeque Iterator member will hold each of the tree nodes, in the order 
       specified by the traversal type. 
       
       Args:
        node (TreeNode<T>*): holds the root of some subtree, to then traverse over
        traversalType (int): refers to one of the traversal types identified in the anonymous enum in the 
        nesting BST class. 
        */
    if (node == nullptr) {
        return;
    }
    switch (traversalType) {
        case INORDER: // enqueue through inorder traversal
            queueUp(node->getLeft(), tree.INORDER);
            nodeDeque.push_back(node->getVal());
            queueUp(node->getRight(), tree.INORDER);
            break;
        case PREORDER: // enqueue through preorder traversal
            nodeDeque.push_back(node->getVal());
            queueUp(node->getLeft(), tree.PREORDER);
            queueUp(node->getRight(), tree.PREORDER);
            break;
        case POSTORDER: // enqueue through postorder traversal
            queueUp(node->getLeft(), tree.POSTORDER);
            queueUp(node->getRight(), tree.POSTORDER);
            nodeDeque.push_back(node->getVal());
            break;
        case LEVELORDER: // enqueue through levelorder traversal (breadth first search)
            std::deque<TreeNode<T>*> deque;
            deque.push_back(node);

            TreeNode<T>* curr;
            while (!deque.empty()) {
                curr = deque.front();
                deque.pop_front();
                nodeDeque.push_back(curr);
                
                if (curr->getLeft() != nullptr) {
                    deque.push_back(curr->getLeft());
                }
                
                if (curr->getRight() != nullptr) {
                    deque.push_back(curr->getRight());
                }
            }
            break;
    }
}

template <typename T>
TreeNode<T>* BST<T>::Iterator::iterate() const {
    /* Each time that this is called it returns a node from the tree, effectively allowing for iterative 
       traversal over the tree, until the tree has been traversed over. 
       
       Returns:
        a tree node (the next in some order of traversal), or nullptr if the iterative traversal has completed.
        */
    // return nullptr if nodeDeque is empty
    if (nodeDeque.empty()) {
        return nullptr;
    }
    // pop the first node from the nodeDeque and return it
    TreeNode<T>* front = nodeDeque.front();
    nodeDeque.pop_front();
    return front;
}

template <typename T>
bool BST<T>::Iterator::resetIterator() const {
    /* Clears the node deque inside the iterator, allowing for the iterator to be used for a new iterative traversal */
    nodeDeque.clear();
}

// ------------------ BST iteration Member Functions --------------------------------------------------------------------------------------

template <typename T>
void BST<T>::initIterator(int order/*=INORDER*/) const {
    /* Causes the iterator to fill its deque through the traversal of the tree as specified by order.
       Must be called explicitly if want to iterate through any traversals other than inorder, or reste the
       Iterator, but can be called implicitly by simply running the iterate function on the BST if it is 
       known that the nodeDeque is empty.
       
       Args:
        order (int): the traversal type as assciated with the integer in the anonyumous enum 
        */
    iterator.resetIterator(); // clear the nodeDeque in case a previous traversal did not empty it.

    switch (order) {
        case PREORDER: // enqueue through preorder traversal
            iterator.queuePreorder();
            break;
        case POSTORDER: // enqueue through postorder traversal
            iterator.queuePostorder();
            break;
        case LEVELORDER: // enqueue through levelorder traversal
            iterator.queueLevelorder();
            break;
        default: // enqueue through inorder traversal (when order < 2 or order > 3)
            iterator.queueInorder();
            break;
    }
}

template <typename T>
TreeNode<T>* BST<T>::iterate() const {
    /* BST function to interface with the nested Iterator. Initializes the iterator to iterate through
       an inorder traversal if it is empty, so the explicit initialization may be skipped if that is what is desired
       
       Returns:
        a tree node (the next in some order of traversal), or nullptr if the iterative traversal has completed.  
        */
    if (this->iterator.nodeDeque.empty()) {
        initIterator();
    }
    return iterator.iterate();
}

// ===================================================================================================================================
// ------------------ Regular BST member functions -----------------------------------------------------------------------------------
// ===================================================================================================================================

template <typename T>
BST<T>::BST(T val/*=NULL*/) {
    /* Constructor. Initializes the root of the tree to a tree node with a value if given, otherwise to null.
       Initializes the iterator in the tree with a reference to the tree */
    if (val != NULL) {
        TreeNode<T>* newNode = new TreeNode<T>(val);
        this->root = newNode;
    } else {
        this->root = nullptr;
    }
    this->iterator = Iterator(*this);
}

template <typename T>
BST<T>::~BST() {
    /* Destructor. Causes the deletion of each node in the tree before allowing deletion of the tree itself */
    traverseDelete(this->root);
}

template <typename T>
void BST<T>::traverseDelete(TreeNode<T>* node) {
    /* Destructor helper function deletes the nodes of the tree recursively */
    if (node == nullptr) {
        return;
    }
    traverseDelete(node->getLeft());
    traverseDelete(node->getRight());
    delete node;
}

template <typename T>
void BST<T>::Insert(T val) {
    /* Initializes a new tree node with the given value and inserts it in the tree according to BST rules */
    TreeNode<T>* newNode = new TreeNode<T>(val); // initialize new node with given value
    if (isEmpty()) { // if tree is empty, make the root node this new node and return
        this->root = newNode;
        return;
    }
    TreeNode<T>* parent, *curr = this->root;
    T currVal;
    while(curr != nullptr) { // traverse down tree to find empty leaf where the new node should be inserted
        currVal = curr->getVal();
        if (currVal == val) { // if value is already in the tree, delete the new node as redundancy
            delete newNode;
            return;
        } else if (currVal < val) {
            curr = curr->getRight();
        } else {
            curr = curr->getLeft();
        }
    }
    if (curr == parent->getLeft()) { // set relationship between parent and new node through appropraite pointers
        parent->setLeft(newNode);
    } else {
        parent->setRight(newNode);
    }
    newNode->setParent(parent);
}

template <typename T>
TreeNode<T>* BST<T>::search(T val) const {
    /* search for a node in the BST with the given value.
    
       Returns:
        tree node with the given value if it is in the tree, nullptr otherwise 
        */
    TreeNode<T>* curr = this->root;
    T currVal;
    while (curr != nullptr) {
        currVal = curr->getVal();
        if (currVal == val) {
            return curr;
        } else if (currVal < val) {
            curr = curr->getRight();
        } else {
            curr = curr->getLeft();
        }
    }
    return nullptr;
}

template <typename T>
void BST<T>::deleteNode(T val) {
    /* Deletes the node with the given value from the tree if the tree contains a node with the value */
    TreeNode<T>* node = search(val); // finds node associated with the given value
    if (node == nullptr) { // if node with value not found, return
        return;
    }
    TreeNode<T>* parent = (node != this->root) ? node->getParent() : nullptr;
    if ((node->getLeft() == nullptr) && (node->getRight() == nullptr)) { // Case 1: node has no children
        if (parent == nullptr) {
            this->root = nullptr;
        } else if (node == parent->getLeft()) {
            parent->setLeft(nullptr);
        } else {
            parent->setRight(nullptr);
        }
        delete node;
    } else if (((node->getLeft() != nullptr) || (node->getRight() != nullptr)) && (node->getLeft() != node->getRight())) {
        // Case 2: node has 1 child
        TreeNode<T>* child = (node->getLeft() != nullptr) ? node->getLeft() : node->getRight();
        if (parent == nullptr) {
            this->root = child;
        } else if (parent->getLeft() == node) {
            parent->setLeft(child);
        } else {
            parent->setRight(child);
        }
        child->setParent(parent);
        delete node;
    } else { // Case 3: node has 2 children
        TreeNode<T>* successor = successor(node);
        T tmpVal = node->getVal();
        node->setVal(successor->getVal());
        successor->setVal(tmpVal);
        deleteNode(val);
    }
}

template <typename T>
TreeNode<T>* BST<T>::successor(TreeNode<T>* node) const {
    /* Returns: the node with the next higher value to the given node */
    if (node->getRight() != nullptr) { // if node has right child, successor is smallest value in this right subtree
        return getMin(node->getRight());
    }
    // if no right child, successor is either root of subtree or first ancestor which is the left child of its parent
    TreeNode<T>* curr = node, *parent = node->getParent();
    while ((parent != nullptr) && (curr == parent->getRight())) {
        curr = parent;
        parent = parent->getParent();
    }
    return parent;
}

template <typename T>
TreeNode<T>* BST<T>::predecessor(TreeNode<T>* node) const {
    /* Returns: the node with the next lower value to the given node */
    if (node->getLeft() != nullptr) { // if node has left child, successor is largest value in this left subtree
        return getMax(node->getLeft());
    }
    // if no left child, successor is either root of subtree or first ancestor which is the right child of its parent
    TreeNode<T>* curr = node, *parent = node->getParent();
    while ((parent != nullptr) && (curr != parent->getLeft())) {
        curr = parent;
        parent = parent->getParent();
    }
    return parent;
}

template <typename T>
std::vector<T> BST<T>::treeSort() const {
    /* Traverses the BST inorder and adds each node to a vector, effectively sorts the values in ascending order */
    std::vector<T> list;
    traverseInorder(this->root, list);
    return list;
}

template <typename T>
void BST<T>::traverseInorder(TreeNode<T>* node, std::vector<T>& list) {
    /* Helper function for treeSort, traverses the BST inorder recursivley adding the values to the vector */
    if (node == nullptr) {
        return;
    }
    traverseInorder(node->getLeft(), list);
    list.push_back(node->getVal());
    traverseInorder(node->getRight(), list);
}

template <typename T>
TreeNode<T>* BST<T>::getMax(TreeNode<T>* node) const {
    /* Returns: the maximum value of the subtree with a root at node */
    TreeNode<T>* left, *curr = this->root;
    while ((left = curr->getLeft) != nullptr) {
        curr = left;
    }
    return curr;
}

template <typename T>
TreeNode<T>* BST<T>::getMin(TreeNode<T>* node) const {
    /* Returns: the minimum value of the subtree with a root at node */
    TreeNode<T>* right, *curr = this->root;
    while ((right = curr->getRight()) != nullptr) {
        curr = right;
    }
    return curr;
}

/* treeMax and treeMin defined inline:
TreeNode<T>* treeMax() const { return getMax(this->root); }
TreeNode<T>* treeMin() const { return getMin(this->root); }
*/

/* isEmpty defined inline:
bool isEmpty() const { return this->root == nullptr; }
*/

template <typename T>
int BST<T>::height(TreeNode<T>* node) const {
    /* Returns: the maximum height of a subtree with a root at node */
    if (this->isEmpty()) {
        return 0;
    } else if (node == nullptr) {
        return -1;
    }
    return 1 + std::max(height(node->getLeft()), height(node->getRight()));
}

template <typename T>
int BST<T>::population(TreeNode<T>* node) const {
    /* Returns: the number of nodes in a subtree with the root at node */
    if (node == nullptr) {
        return 0;
    }
    return 1 + population(node->getLeft()) + population(node->getRight());
}

/* treePopulation defined inline:
int treePopulation() const { return population(this->root); }
*/
