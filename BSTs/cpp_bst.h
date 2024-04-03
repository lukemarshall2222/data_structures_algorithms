/* BST in cpp */


#include <vector>
using namespace std;
template <typename T>
class TreeNode {
    T val;
    TreeNode<T>* parent;
    TreeNode<T>* right;
    TreeNode<T>* left;

public:
    // Constructor:
    TreeNode(T val, TreeNode<T>* parent, <T>* right, TreeNode<T>* left) : 
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
class LinkedList {
    TreeNode<T>* root;
    enum {
        INORDER = 1,
        PREORDER = 2,
        POSTORDER = 3
    };

    class Iterator {
        TreeNode<T>* curr;
        Iterator() : curr(this->head) {};
        TreeNode<T>* iterateInorder();
        bool resetIterator();
    };
    const vector<T>& traverse(TreeNode<T>* node, int traversal_type) const;

public:
    // Constructor:
    LinkedList(T val=nullptr);

    // Destructor:
    ~LinkedList();

    void Insert(T val);
    TreeNode<T>* search() const;
    void deleteNode();
    TreeNode<T>* successor() const;
    TreeNode<T>* predecessor() const:
    
    const vector<T>& treeSort() const;
    const vector<T>& inorder()const;
    const vector<T>& preorder()const;
    const vector<T>& postorder()const;
    TreeNode<T>* getMax(TreeNode<T>* node) const;
    TreeNode<T>* getMin(TreeNode<T>* node) const;
    TreeNode<T>* treeMax() const { return getMax(this->root); }
    TreeNode<T>* treeMin() const { return getMin(this->root); }

    bool isEmpty() const { return this->root == nullptr; }
    int height(TreeNode<T>* node) const;
    int population(TreeNode<T>* node) const;
    int treePopulation() const { return population(this->root); }
};

