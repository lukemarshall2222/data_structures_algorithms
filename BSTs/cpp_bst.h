/* BST in cpp */


#include <vector>
#include <iostream> 

using namespace std;


template <typename T>
class TreeNode {
    T val;
    TreeNode<T>* parent;
    TreeNode<T>* right;
    TreeNode<T>* left;

public:
    // Constructor:
    TreeNode(T val, TreeNode<T>* parent=nullptr, <T>* right=nullptr, TreeNode<T>* left=nullptr) : 
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
    enum {
        INORDER = 1,
        PREORDER = 2,
        POSTORDER = 3,
        LEVELORDER = 4
    };

    class Iterator {
        const BST<T>& tree;
        int order;
        vector<TreeNode<T>*> nodeQueue;
        Iterator() { std::cout << "Iterator is inopperable without reference to a tree and type of iteration." << std::endl }
        Iterator(BST<T>& treeRef, int order=1) : tree(treeRef) order(order) {};
        void queueInorder() const;
        void queuePreorder() const;
        void queuePostorder() const;
        void queueLevelorder() const;
        void queueUp() const;
    

    public:
        TreeNode<T>* iterate() const;
        bool resetIterator() const;
    };

    Iterator iterator;

public:
    // Constructor:
    BST(T val=nullptr);

    // Destructor:
    ~BST();

    TreeNode<T>* getRoot() { return this.root }
    void Insert(T val);
    TreeNode<T>* search() const;
    void deleteNode();
    TreeNode<T>* successor() const;
    TreeNode<T>* predecessor() const:
    
    vector<T>& treeSort() const;
    TreeNode<T>* iterate(int order) const;
    TreeNode<T>* getMax(TreeNode<T>* node) const;
    TreeNode<T>* getMin(TreeNode<T>* node) const;
    TreeNode<T>* treeMax() const { return getMax(this->root); }
    TreeNode<T>* treeMin() const { return getMin(this->root); }

    bool isEmpty() const { return this->root == nullptr; }
    int height(TreeNode<T>* node) const;
    int population(TreeNode<T>* node) const;
    int treePopulation() const { return population(this->root); }
};

