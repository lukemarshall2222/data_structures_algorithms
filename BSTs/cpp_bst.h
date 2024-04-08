/* BST in cpp */


#include <vector>
#include <deque>
#include <algorithm>
#include <iostream>


template <typename T>
class TreeNode {
    T val;
    TreeNode<T>* parent;
    TreeNode<T>* right;
    TreeNode<T>* left;

public:
    // Constructor:
    TreeNode(T val, TreeNode<T>* parent=nullptr, TreeNode<T>* right=nullptr, TreeNode<T>* left=nullptr) : 
                   val(val), parent(parent), right(right), left(left) {}

    // Destructor:
    ~TreeNode() {}

    // Getters:
    T getVal() { return val; }
    TreeNode<T>* getParent() const { return parent; }
    TreeNode<T>* getRight() const { return right; }
    TreeNode<T>* getLeft() const { return left; }

    // Setters:
    void setVal(T val) { this->val = val; }
    void setParent(TreeNode<T>* parent) { this->parent = parent; }
    void setRight(TreeNode<T>* right) { this->right = right; }
    void setLeft(TreeNode<T>* left) { this->left = left; }
};

template <typename T>
class BST {

    TreeNode<T>* root;

    // traversal types for iteration
    enum {
        INORDER = 1,
        PREORDER = 2,
        POSTORDER = 3,
        LEVELORDER = 4
    };

    // Iterator class allows for creation of specified traversal through the tree as deque and then
    // stepwise iterate through that traversal
    class Iterator {
        // Reference to tree:
        const BST<T>& tree;
        // deque to hold nodes from tree in specified traversal order:
        std::deque<TreeNode<T>*> nodeDeque;

        // Constructors:
        Iterator() { std::cout << "Iterator is inopperable without reference to a tree." << std::endl; }
        Iterator(BST<T>& treeRef) : tree(treeRef) {};

        // Queueing:
        void queueInorder() const;
        void queuePreorder() const;
        void queuePostorder() const;
        void queueLevelorder() const;
        void queueUp(const TreeNode<T>* const node, int traversalType=INORDER) const;
    

    public:
        // Functions for iteration used by BST
        TreeNode<T>* iterate() const;
        bool resetIterator() const;
    };

    // Iterator:
    Iterator iterator;

    // Helpers:
    void traverseDelete(TreeNode<T>* node);
    void traverseInorder(TreeNode<T>* node, std::vector<T>& list);


public:
    // Constructor:
    BST(T val=NULL);

    // Destructor:
    ~BST();

    // Tree manipulation:
    void Insert(T val);
    void deleteNode(T val);
    std::vector<T> treeSort() const;

    // Finding nodes:
    TreeNode<T>* search(T val) const;
    TreeNode<T>* successor(TreeNode<T>* node) const;
    TreeNode<T>* predecessor(TreeNode<T>* node) const;
    TreeNode<T>* getRoot() { return this->root; }
    TreeNode<T>* getMax(TreeNode<T>* node) const;
    TreeNode<T>* getMin(TreeNode<T>* node) const;
    TreeNode<T>* treeMax() const { return getMax(this->root); }
    TreeNode<T>* treeMin() const { return getMin(this->root); }

    // Iteration:
    void initIterator(int order=INORDER) const;
    TreeNode<T>* iterate() const;

    // Utility:
    bool isEmpty() const { return this->root == nullptr; }
    int height(TreeNode<T>* node) const;
    int population(TreeNode<T>* node) const;
    int treePopulation() const { return population(this->root); }
};

