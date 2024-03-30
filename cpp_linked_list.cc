/* Function Implementations for ListNode and LinkedList classes */

#include "cpp_linked_list.h"

/*----------------- ListNode Member Function Implementations -------------------------------------------------------------------------------------------*/

// Setters:

template <typename T>
void ListNode<T>::setVal(T val) {
    this->val = val;
}

template <typename T>
void ListNode<T>::setPrev(ListNode<T>* prev) {
    this->prev = prev;
}

template <typename T>
void ListNode<T>::setNext(ListNode<T>* next) {
    this->next = next;
}

// Getters:

template <typename T>
T ListNode<T>::getVal() {
    return val;
}

template <typename T>
ListNode<T>* ListNode<T>::getPrev() {
    return prev;
}

template <typename T>
ListNode<T>* ListNode<T>::getNext() {
    return next;
}

/*----------------- LinkedList Member Function Implementations -------------------------------------------------------------------------------------------*/

// Destructor:
template <typename T>
LinkedList<T>::~LinkedList() {
    ListNode<T>* tmp, *curr = head;
    while (curr != nullptr) {
        tmp = curr;
        curr = curr->getNext();
        delete tmp;
    }
}

// Insert Member Functions:

template <typename T>
void LinkedList<T>::push(T val) {
    ListNode<T> newNode = new ListNode<T>(val);
    newNode->setNext(head);
    head->setPrev(newNode);
    head = newNode;
}

template <typename T>
void LinkedList<T>::append(T val) {
    ListNode<T> newNode = new ListNode<T>(val);
    if (isEmpty()) {
        head = &newNode;
        return;
    }
    ListNode<T>* curr = head;
    while (curr->getNext() != nullptr) {
        curr = curr->getNext();
    }
    curr->setNext(newNode);
    newNode->setPrev(curr);
}
