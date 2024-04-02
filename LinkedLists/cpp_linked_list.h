/* C++ class definitions for list node and linked list */

#include <iostream>

template <typename T>
class ListNode {
    T val;
    ListNode* prev;
    ListNode* next;

public:
    // Constructor: all params have default values
    ListNode(T val=NULL, ListNode* next=nullptr, ListNode* next=nullptr) : val<T>(val), prev(prev), next(next) {}
    // Destructor:
    ~ListNode() {} 

    // Setters:
    void setVal(T val);
    void setPrev(ListNode* prev);
    void setNext(ListNode* next);

    // Getters:
    T getVal();
    ListNode<T>* getPrev();
    ListNode<T>* getNext();

    // operators:
    bool operator==(const ListNode& rhs) const;
};

template <typename T>
class LinkedList {
    ListNode* head;

public:
    // Constructor: headVal defaults to null
    LinkedList() { this->head = nullptr};
    // Destructor: 
    ~LinkedList();

    // Insert Member Functions:
    void push(T val);
    void append(T val);
    void insertBefore(T val, ListNode<T>& before);
    void insertAfter(T val, ListNode<T>& after);
    void insertAtPos(T val, int pos);

    // Deletion Member Functions:
    T pop();
    T dequeue();
    T deleteNode(ListNode<T>& node);
    T deleteVal(T val);
    T removeBefore(ListNode<T>& before);
    T removeAfter(ListNode<T>& after);
    T removeAtPos(int pos);

    //Utility Member Functions:
    bool isEmpty() { return this->head == nullptr; };
    int length();
    void printList();
    void clear();
};