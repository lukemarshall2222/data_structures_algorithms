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
};

template <typename T>
class LinkedList {
    ListNode* head;

public:
    // Constructor: headVal defaults to null
    LinkedList(T headVal=nullptr) { head = new ListNode(val=headVal)};
    // Destructor: 
    ~LinkedList();

    // Insert Member Functions:
    void push(T val);
    void append(T val);
    void insertBefore(T val);
    void insertAfter(T val);
    void insertAtPos(T val, int pos);

    // Deletion Member Functions:
    T pop();
    T dequeue();
    T removeBefore(ListNode<T> node);
    T removeAfter(ListNode<T> node);
    T removeAtPos(int pos);

    //Utility Member Functions:
    bool isEmpty() { return head == nullptr; };
    int length();
    void printList();
    void clear();
};