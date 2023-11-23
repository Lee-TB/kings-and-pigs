Array.prototype.chunk = function(size = 1) {  
  const newArray = [];
  for (let i = 0; i < this.length; i += size) {
    newArray.push(this.slice(i, i + size));
  }
  return newArray;
};

