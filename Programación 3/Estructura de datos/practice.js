class Node {
    constructor (data){ 
      this.data= data;
      this.next= null
    }
}

 const head = newNode(4);
 const nodeB = newNode(2); 
 const nodeC = newNode(3); 
 const nodeD = newNode(10); 


function countNodes(head) {
    let count = 0
      let current = head
       while (current !== null)
        {
          count ++
          current=current.next
        }
    return count;
}



const nodeCount = countNodes(head)
console.log(`number of nodes = ` + nodeCount)

