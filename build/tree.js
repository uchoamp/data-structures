var TreeNode = (function () {
    function TreeNode(value) {
        this.value = value;
        this.level = 0;
        this.degree = 0;
        this.dad = undefined;
        this.right = undefined;
        this.left = undefined;
        this.position = { x: 0, y: 0 };
    }
    return TreeNode;
}());
var Tree = (function () {
    function Tree() {
        this.root = undefined;
        this.lenght = 0;
        this.height = 0;
        this.biggest = 0;
        this.lowest = 0;
        this.offsetX = 40;
        this.offsetY = 64;
    }
    Tree.prototype.push = function (value) {
        var offsetX = this.offsetX;
        var offsetY = this.offsetY;
        function search(root, value) {
            function searchRight(node, value) {
                if (node.value == value) {
                    return undefined;
                }
                if (node.value > value) {
                    if (node.right)
                        return searchRight(node.right, value);
                }
                else {
                    if (node.left) {
                        var res = searchRight(node.left, value);
                        if (res) {
                            node.position.x -= offsetX;
                            if (node.right)
                                Tree.updateX(node.right, -offsetX);
                        }
                        return res;
                    }
                    node.position.x -= offsetX;
                    if (node.right)
                        Tree.updateX(node.right, -offsetX);
                }
                return node;
            }
            function searchLeft(node, value) {
                if (node.value == value) {
                    return undefined;
                }
                if (node.value > value) {
                    if (node.right) {
                        var res = searchLeft(node.right, value);
                        if (res) {
                            node.position.x += offsetX;
                            if (node.left)
                                Tree.updateX(node.left, offsetX);
                        }
                        return res;
                    }
                    node.position.x += offsetX;
                    if (node.left)
                        Tree.updateX(node.left, offsetX);
                }
                else {
                    if (node.left)
                        return searchLeft(node.left, value);
                }
                return node;
            }
            if (root.value === value) {
                return undefined;
            }
            if (root.value > value) {
                if (root.right)
                    return searchRight(root.right, value);
            }
            else {
                if (root.left)
                    return searchLeft(root.left, value);
            }
            return root;
        }
        if (this.root) {
            var dad = search(this.root, value);
            if (dad) {
                var node = new TreeNode(value);
                if (dad.value > value) {
                    dad.right = node;
                    node.position.x = dad.position.x - offsetX;
                }
                else {
                    dad.left = node;
                    node.position.x = dad.position.x + offsetX;
                }
                node.position.y = dad.position.y + offsetY;
                dad.degree += 1;
                node.dad = dad;
                node.level = dad.level + 1;
                this.lenght++;
                if (value > this.biggest)
                    this.biggest = value;
                if (value < this.lowest)
                    this.lowest = value;
                if (this.height <= node.level)
                    this.height = node.level + 1;
                return true;
            }
            return false;
        }
        else {
            this.root = new TreeNode(value);
            this.height = 1;
            this.lenght++;
            this.biggest++;
            this.lowest = value;
            this.biggest = value;
            this.root.position.x = window.innerWidth / 2;
            this.root.position.y = 27;
            return true;
        }
    };
    Tree.prototype.pop = function (value) {
        var offsetX = this.offsetX;
        var offsetY = this.offsetY;
        function search(root, value) {
            function searchRight(node, value) {
                if (node.value == value) {
                    return [node, 0];
                }
                if (node.value > value) {
                    if (node.right)
                        return searchRight(node.right, value);
                }
                else {
                    if (node.left) {
                        var res = searchRight(node.left, value);
                        if (res) {
                            res[1] = offsetX;
                            node.position.x += offsetX;
                            if (node.right)
                                Tree.updateX(node.right, offsetX);
                        }
                        return res;
                    }
                }
                return [undefined, 0];
            }
            function searchLeft(node, value) {
                if (node.value == value) {
                    return [node, 0];
                }
                if (node.value > value) {
                    if (node.right) {
                        var res = searchLeft(node.right, value);
                        if (res) {
                            res[1] = -offsetX;
                            node.position.x -= offsetX;
                            if (node.left)
                                Tree.updateX(node.left, -offsetX);
                        }
                        return res;
                    }
                }
                else {
                    if (node.left)
                        return searchLeft(node.left, value);
                }
                return [undefined, 0];
            }
            if (root.value == value)
                return [root, 0];
            if (root.value > value) {
                if (root.right)
                    return searchRight(root.right, value);
            }
            else {
                if (root.left)
                    return searchLeft(root.left, value);
            }
            return [undefined, 0];
        }
        function travelRight(node) {
            if (node.right) {
                return travelRight(node.right);
            }
            return node;
        }
        if (!this.root) {
            return false;
        }
        var _a = search(this.root, value), node = _a[0], offset = _a[1];
        if (node) {
            if (node.degree === 0) {
                if (node.dad) {
                    if (node.dad.right === node) {
                        node.dad.right = undefined;
                    }
                    else {
                        node.dad.left = undefined;
                    }
                    node.dad.degree -= 1;
                }
                else {
                    this.root = undefined;
                }
            }
            else if (node.degree === 1) {
                var nodereplace = undefined;
                if (node.right) {
                    nodereplace = node.right;
                    if (this.root.value < value) {
                        if (node.dad.left == node) {
                            offset = 0;
                        }
                        else
                            offset = -offsetX;
                    }
                    else {
                        offset = offsetX;
                    }
                }
                else {
                    nodereplace = node.left;
                    if (this.root.value > value) {
                        if (node.dad.right == node) {
                            offset = 0;
                        }
                        else
                            offset = offsetX;
                    }
                    else {
                        offset = -offsetX;
                    }
                }
                if (node.dad) {
                    nodereplace.dad = node.dad;
                    if (node.dad.right == node) {
                        node.dad.right = nodereplace;
                    }
                    else {
                        node.dad.left = nodereplace;
                    }
                }
                else {
                    offset = node.position.x - nodereplace.position.x;
                    nodereplace.dad = undefined;
                    this.root = nodereplace;
                }
                Tree.updateX(nodereplace, offset);
                nodereplace.level = node.level;
            }
            else {
                var nodereplace = travelRight(node.left);
                nodereplace.level = node.level;
                if (nodereplace === node.left) {
                    offset = node.position.x - nodereplace.position.x;
                    if (this.root.value > value) {
                        offset = 0;
                        Tree.updateX(node.right, offsetX);
                    }
                    Tree.updateX(nodereplace, offset);
                    if (node.right) {
                        node.right.dad = nodereplace;
                        nodereplace.right = node.right;
                    }
                    nodereplace.degree = nodereplace.left ? 2 : 1;
                    if (node.dad) {
                        if (node.dad.right === node) {
                            node.dad.right = nodereplace;
                        }
                        else {
                            node.dad.left = nodereplace;
                        }
                    }
                    else {
                        this.root = nodereplace;
                    }
                    nodereplace.dad = node.dad;
                }
                else {
                    if (nodereplace.left) {
                        nodereplace.dad.right = nodereplace.left;
                        nodereplace.left.dad = nodereplace.dad;
                    }
                    else {
                        nodereplace.dad.right = undefined;
                        nodereplace.dad.degree--;
                    }
                    nodereplace.degree = node.degree;
                    node.right.dad = nodereplace;
                    node.left.dad = nodereplace;
                    nodereplace.right = node.right;
                    nodereplace.left = node.left;
                    nodereplace.dad = node.dad;
                    if (node.dad) {
                        if (node.dad.right === node) {
                            node.dad.right = nodereplace;
                        }
                        else {
                            node.dad.left = nodereplace;
                        }
                    }
                    else {
                        this.root = nodereplace;
                    }
                    if (this.root.value > value && this.root != nodereplace) {
                        Tree.updateX(nodereplace.right, offsetX);
                    }
                    else {
                        offset = -offsetX;
                        nodereplace.position.x -= offsetX;
                        Tree.updateX(nodereplace.left, offset);
                    }
                }
            }
            this.lenght -= 1;
            this.updateTree();
            return true;
        }
        return false;
    };
    Tree.prototype.travel = function () {
        function travel(node) {
            console.log("Value: " + node.value + ", Grau: " + node.degree + ", Level: " + node.level);
            console.log(node.position);
            if (node.right)
                travel(node.right);
            if (node.left)
                travel(node.left);
        }
        if (this.root)
            travel(this.root);
    };
    Tree.prototype.search = function (value, b) {
        if (b === void 0) { b = undefined; }
        function search(node, value) {
            if (node.value == value) {
                return node;
            }
            if (node.value > value) {
                if (node.right)
                    return search(node.right, value);
            }
            else {
                if (node.left)
                    return search(node.left, value);
            }
            return undefined;
        }
        function searchAB(node, a, b) {
            if (node.value > a == node.value > b &&
                !(node.value == a || node.value == b)) {
                if (node.value > a) {
                    if (node.right)
                        return searchAB(node.right, a, b);
                }
                else {
                    if (node.left)
                        return searchAB(node.left, a, b);
                }
                return [undefined, undefined, undefined];
            }
            else if (node.value == a) {
                return [node, search(node, b), node];
            }
            else if (node.value == b) {
                return [search(node, a), node, node];
            }
            else {
                return [search(node, a), search(node, b), node];
            }
        }
        if (b) {
            if (!this.root) {
                return [undefined, undefined, undefined];
            }
            return searchAB(this.root, value, b);
        }
        else {
            if (!this.root) {
                return undefined;
            }
            return search(this.root, value);
        }
    };
    Tree.prototype.updateTree = function () {
        var offsetY = this.offsetY;
        function travel(node, tree) {
            node.position.y = offsetY * node.level + 27;
            if (node.right) {
                node.right.level = node.level + 1;
                travel(node.right, tree);
            }
            if (node.left) {
                node.left.level = node.level + 1;
                travel(node.left, tree);
            }
            if (node.level >= tree.height)
                tree.height = node.level + 1;
            if (node.value > tree.biggest)
                tree.biggest = node.value;
            if (node.value < tree.lowest)
                tree.lowest = node.value;
        }
        this.height = 0;
        this.lowest = 0;
        this.biggest = 0;
        if (this.root) {
            this.lowest = this.root.value;
            this.biggest = this.root.value;
            this.root.level = 0;
            travel(this.root, this);
        }
    };
    Tree.prototype.draw = function (ctx) {
        function drawTree(node) {
            var value = node.value.toString();
            if (node.right) {
                ctx.beginPath();
                ctx.lineWidth = 1.4;
                ctx.lineTo(node.position.x, node.position.y);
                ctx.lineTo(node.right.position.x, node.right.position.y);
                ctx.stroke();
                drawTree(node.right);
            }
            if (node.left) {
                ctx.beginPath();
                ctx.lineWidth = 1.4;
                ctx.lineTo(node.position.x, node.position.y);
                ctx.lineTo(node.left.position.x, node.left.position.y);
                ctx.stroke();
                drawTree(node.left);
            }
            Tree.drawNode(node, ctx);
        }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeStyle = "black";
        if (this.root)
            drawTree(this.root);
    };
    Tree.prototype.searchDraw = function (start, end, ctx, clear, notend) {
        if (clear === void 0) { clear = true; }
        if (notend === void 0) { notend = false; }
        function normalDraw(node) {
            var value = node.value.toString();
            ctx.strokeStyle = "#000000";
            if (node.right) {
                ctx.beginPath();
                ctx.lineWidth = 1.4;
                ctx.lineTo(node.position.x, node.position.y);
                ctx.lineTo(node.right.position.x, node.right.position.y);
                ctx.stroke();
                normalDraw(node.right);
            }
            if (node.left) {
                ctx.beginPath();
                ctx.lineWidth = 1.4;
                ctx.lineTo(node.position.x, node.position.y);
                ctx.lineTo(node.left.position.x, node.left.position.y);
                ctx.stroke();
                normalDraw(node.left);
            }
            Tree.drawNode(node, ctx);
        }
        function whoSide(node, right) {
            if (right !== undefined) {
                if (right) {
                    if (node.left) {
                        ctx.beginPath();
                        ctx.strokeStyle = "black";
                        ctx.lineWidth = 1.4;
                        ctx.lineTo(node.position.x, node.position.y);
                        ctx.lineTo(node.left.position.x, node.left.position.y);
                        ctx.stroke();
                        normalDraw(node.left);
                    }
                }
                else {
                    if (node.right) {
                        ctx.beginPath();
                        ctx.strokeStyle = "black";
                        ctx.lineWidth = 1.4;
                        ctx.lineTo(node.position.x, node.position.y);
                        ctx.lineTo(node.right.position.x, node.right.position.y);
                        ctx.stroke();
                        normalDraw(node.right);
                    }
                }
            }
        }
        function orangeDraw(node, end, right) {
            if (node === end) {
                if (notend) {
                    return;
                }
                if (node.dad) {
                    ctx.beginPath();
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = 1.4;
                    ctx.lineTo(node.position.x, node.position.y);
                    ctx.lineTo(node.dad.position.x, node.dad.position.y);
                    ctx.stroke();
                }
                if (clear) {
                    whoSide(node, right);
                }
                Tree.drawNode(node, ctx, "#ff7700", "white", "#ff7700");
                while (node.dad) {
                    right = node.dad.right === node;
                    node = node.dad;
                    if (node.dad) {
                        ctx.beginPath();
                        ctx.strokeStyle = "black";
                        ctx.lineWidth = 1.4;
                        ctx.lineTo(node.position.x, node.position.y);
                        ctx.lineTo(node.dad.position.x, node.dad.position.y);
                        ctx.stroke();
                    }
                    whoSide(node, right);
                    Tree.drawNode(node, ctx);
                }
                return;
            }
            whoSide(node, right);
            if (node.dad && node !== end) {
                ctx.beginPath();
                ctx.strokeStyle = "#ff7700";
                ctx.lineWidth = 1.4;
                ctx.lineTo(node.position.x, node.position.y);
                ctx.lineTo(node.dad.position.x, node.dad.position.y);
                ctx.stroke();
                orangeDraw(node.dad, end, node.dad.value > node.value);
            }
            Tree.drawNode(node, ctx, "#ff7700", "white", "#ff7700");
        }
        if (clear)
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeStyle = "black";
        if (start.right) {
            ctx.beginPath();
            ctx.lineWidth = 1.4;
            ctx.lineTo(start.position.x, start.position.y);
            ctx.lineTo(start.right.position.x, start.right.position.y);
            ctx.stroke();
            normalDraw(start.right);
        }
        if (start.left) {
            ctx.beginPath();
            ctx.lineWidth = 1.4;
            ctx.lineTo(start.position.x, start.position.y);
            ctx.lineTo(start.left.position.x, start.left.position.y);
            ctx.stroke();
            normalDraw(start.left);
        }
        if (start.dad)
            orangeDraw(start, end, undefined);
        else {
            Tree.drawNode(start, ctx, "#ff7700", "white", "#ff7700");
        }
    };
    Tree.updateX = function (node, offset) {
        function travel(node) {
            node.position.x += offset;
            if (node.right)
                travel(node.right);
            if (node.left)
                travel(node.left);
        }
        travel(node);
    };
    Tree.drawNode = function (node, ctx, bgcolor, fcolor, lcolor) {
        if (bgcolor === void 0) { bgcolor = "black"; }
        if (fcolor === void 0) { fcolor = "white"; }
        if (lcolor === void 0) { lcolor = "black"; }
        var value = String(node.value);
        ctx.strokeStyle = lcolor;
        ctx.beginPath();
        ctx.fillStyle = bgcolor;
        ctx.arc(node.position.x, node.position.y, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = fcolor;
        ctx.fillText(value, node.position.x - ctx.measureText(value).width / 2, node.position.y + 4);
    };
    return Tree;
}());
