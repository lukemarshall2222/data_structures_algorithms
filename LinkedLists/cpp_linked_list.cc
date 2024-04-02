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

// operator:

template <typename T>
bool ListNode<T>::operator==(const ListNode<T>& rhs) const {
    if (this == &rhs) {
        return true;
    }
    return (this->val == rhs.val) && (this->prev == rhs.prev) && (this->next == rhs.next);
}

/*----------------- LinkedList Member Function Implementations -------------------------------------------------------------------------------------------*/

// Destructor:
template <typename T>
LinkedList<T>::~LinkedList() {
    ListNode<T>* tmp, *curr = this->head;
    while (curr != nullptr) {
        tmp = curr;
        curr = curr->getNext;
        delete tmp;
    }
}

// Insert Member Functions:

template <typename T>
void LinkedList<T>::push(T val) {
    ListNode<T> newNode = new ListNode<T>(val);
    newNode->setNext(this->head);
    this->head->setPrev(newNode);
    this->head = newNode;
}

template <typename T>
void LinkedList<T>::append(T val) {
    ListNode<T> newNode = new ListNode<T>(val);
    if (isEmpty()) {
        this->head = &newNode;
        return;
    }
    ListNode<T>* curr = this->head;
    while (curr->getNext() != nullptr) {
        curr = curr->getNext();
    }
    curr->setNext(newNode);
    newNode->setPrev(curr);
}

template <typename T>
void LinkedList<T>::insertBefore(T val, ListNode<T>& before) {
    ListNode<T> newNode = new ListNode<T>(val);
    if (isEmpty()) {
        this->head = &newNode;
        return;
    }
    ListNode* tmp = nullptr, *curr = this->head;
    while (curr != nullptr) {
        if (curr == before) {
            if (curr == this->head) {
                this->head = &newNode;
            } else {
                tmp = curr->getPrev()
                tmp->setNext(&newNode);
            }
            curr->setPrev(&newNode);
            newNode.setNext(curr);
            newNode.setPrev(tmp);
        }
        curr = curr->getNext();
    }
    push(val);
}

template <typename T>
void LinkedList<T>::insertAfter(T val, ListNode<T>& after) {
    ListNode<T> newNode = new ListNode<T>(val);
    if (isEmpty()) {
        head = &newNode;
        return;
    }
    ListNode<T>* tmp = nullptr, *curr = this->head;
    while (curr != nullptr) {
        if (curr == after) {
            if (curr->getNext() != nullptr) {
                tmp = curr->getNext();
                tmp->setPrev(&newNode);
            }
            curr->setNext(&newNode);
            newNode.setNext(tmp);
            newNode.setPrev(curr);
            return;
        }
        curr = curr->getNext();
    }
    append(val);
}

template <typename T>
void LinkedList<T>::insertAtPos(T val, int pos) {
    if (isEmpty()) {
        push(val);
    }
    ListNode<T>* curr = this->root;
    for (int i = 0; i < pos; i++) {
        if (curr == nullptr) {
            append(val);
            return;
        }
        curr = curr->getNext();
    }
    insertBefore(curr);
}

//Deletion Member Functions:

template <typename T>
T LinkedList<T>::pop() {
    if (isEmpty()) {
        return NULL;
    }
    ListNode<T>* tmp = this->head;
    this->head = tmp->getNext();
    this->head->setPrev(nullptr);
    T val = tmp->getVal();
    delete tmp;
    return val;
}

template <typename T>
T LinkedList<T>::dequeue() {
    if (isEmpty()) {
        return NULL;
    }
    ListNode* curr = this->head;
    while (curr->getNext() != nullptr) {
        curr = curr->getNext();
    }
    ListNode* tmp = curr;
    curr->getPrev()->setNext(nullptr);
    T val = tmp->getVal();
    delete tmp;
    return val;
}

template <typename T>
T LinkedList<T>::deleteNode(ListNode<T>& node) {
    if (isEmpty()) {
        return NULL;
    }
    ListNode<T>* curr = this->head;
    while (curr != nullptr) {
        if (curr == node) {
            ListNode<T>* tmp = curr;
            if (curr == this->head) {
                this->head = curr->getNext();
            } else {
                curr->getPrev()->setNext(curr->getNext()); 
            }
            if (curr->getNext() != nullptr) {
                curr->getNext()->setPrev(curr->getPrev);
            }
            T val = tmp->getVal();
            delete tmp;
            return val;
        }
    }
    return NULL;
}

template <typename T>
T LinkedList<T>::deleteVal(T val) {
    if (isEmpty()) {
        return NULL;
    }
    ListNode<T>* curr = this->head;
    while (curr != nullptr) {
        if (curr->getVal() == val) {
            ListNode<T>* tmp = curr;
            if (curr == this->head) {
                this->head = curr->getNext();
            } else {
                curr->getPrev()->setNext(curr->getNext()); 
            }
            if (curr->getNext() != nullptr) {
                curr->getNext()->setPrev(curr->getPrev);
            }
            T tmpVal = tmp->getVal();
            delete tmp;
            return tmpVal;
        }
    }
    return NULL;
}

template <typename T>
T LinkedList<T>::removeBefore(ListNode<T>& before) {
    ListNode<T>* curr = this->head;
    while (curr != nullptr) {
        if (*curr == before) {
            if (curr == this->head) {
                return NULL;
            }
            ListNode<T>* tmp = curr->getPrev();
            T val = tmp->getVal();
            if (tmp == this->head) {
                this->head = curr;
            } else {
                tmp->getPrev()->setNext(curr);
            }
            curr->setPrev(tmp->getPrev());
            delete tmp;
            return val;
        }
    }
    return NULL;
}

template <typename T>
T LinkedList<T>::removeAfter(ListNode<T>& after) {
    ListNode<T>* curr = this->head;
    while (curr != nullptr) {
        if (*curr == after) {
            ListNode<T>* tmp = curr->getNext();
            if (tmp == nullptr) {
                return NULL;
            }
            if (tmp->getNext() != nullptr) {
                tmp->getNext()->setPrev(curr);
            } 
            curr->setNext(tmp->getNext());
            T val = tmp->getVal();
            delete tmp;
            return val;
        }
    }
    return NULL;
}

template <typename T>
T LinkedList<T>::removeAtPos(int pos) {
    ListNode<T>* curr = this->head;
    for (int i = 0; i < pos; i++) {
        if (curr->getNext() == nullptr) {
            return NULL;
        }
        curr = curr->getNext();
    }
    return deleteNode(curr);
}

// Utility Member Functions:

template <typename T> 
int LinkedList<T>::length() {
    int length = 0;
    ListNode<T>* curr = this->head;
    while (curr != nullptr) {
        length++;
        curr = curr->getNext();
    }
    return length;
}

template <typename T>
void LinkedList<T>::printList() {
    if (isEmpty()) {
        std::cout << "The linked list is empty." << std::endl;
    }
    std::cout << "The linked list contains values: "
    ListNode<T>* curr = this->head;
    while (curr != nullptr) {
        std::cout << curr->getVal() << " ";
        curr = curr->getNext();
    }
    std::cout << std::endl;
}

template <typename T>
void LinkedList<T>::clear() {
    if (isEmpty()) {
        return;
    }
    ListNode<T>* tmp, *curr = this->head;
    while (curr->getNext() != nullptr) {
        tmp = curr;
        curr = curr->getNext();
        delete tmp;
    }
    delete curr;
}
