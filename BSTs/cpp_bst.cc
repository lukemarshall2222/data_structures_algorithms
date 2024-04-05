/* BST in C++ */

#include "cpp_bst.h"

template <typename T>
BST<T>::BST(T val) {
    if (val != nullptr) {
        TreeNode<T> newNode = new TreeNode(val);
        this->root = newNode;
    } else {
        this->root = nullptr;
    }
}

template <typename T>
void BST<T>::Iterator::queueInorder() const {

}