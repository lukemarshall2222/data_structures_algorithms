/* cpp BST function implementations */ 

#include "cpp_bst.h"

template <typename T>
void BST<T>::Iterator::queueInorder() const {

}

template <typename T>
void BST<T>::Iterator::queuePreorder() const {

}

template <typename T>
void BST<T>::Iterator::queuePostorder() const {

}

template <typename T>
void BST<T>::Iterator::queueLevelorder() const {

}

template <typename T>
void BST<T>::Iterator::queueUp() const {

}

template <typename T>
TreeNode<T>* BST<T>::Iterator::iterate() const {

}

template <typename T>
bool BST<T>::Iterator::resetIterator() const {

}

template <typename T>
BST<T>::BST(T val) {
    if (val != NULL) {
        TreeNode<T>* newNode = new TreeNode<T>(val);
        this->root = newNode;
    } else {
        this->root = nullptr;
    }
}

template <typename T>
BST<T>::~BST() {
    traverseDelete(this->root);
}

template <typename T>
void BST<T>::traverseDelete(TreeNode<T>* node) {
    if (node == nullptr) {
        return;
    }
    traverseDelete(node->getLeft());
    traverseDelete(node->getRight());
    delete node;
}

template <typename T>
void BST<T>::Insert(T val) {}

template <typename T>
TreeNode<T>* BST<T>::search(T val) const {
    if (isEmpty()) {
        return nullptr;
    }
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
void BST<T>::deleteNode() {}

template <typename T>
TreeNode<T>* BST<T>::successor(TreeNode<T>* node) const {
    if (node->getLeft() != nullptr) {
        return getMax(node->getLeft());
    }
    
}

template <typename T>
TreeNode<T>* BST<T>::predecessor(TreeNode<T>* node) const {}

template <typename T>
vector<T>& BST<T>::treeSort() {}

template <typename T>
TreeNode<T>* BST<T>::iterate(int order) const {}

template <typename T>
TreeNode<T>* BST<T>::getMax(TreeNode<T>* node) const {}

template <typename T>
TreeNode<T>* BST<T>::getMin(TreeNode<T>* node) const {}

template <typename T>
int BST<T>::height(TreeNode<T>* node) const {}

template <typename T>
int BST<T>::population(TreeNode<T>* node) const {}
