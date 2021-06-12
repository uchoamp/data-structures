import { Tree, TreeNode, TypeNode } from "./tree.js";

const tree = new Tree();

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.font = "15px Roboto";

function draw(node: TreeNode): void {
  let value = node.value.toString();

  if (node.right) {
    ctx.beginPath();
    ctx.lineWidth = 1.4;
    ctx.lineTo(node.position.x, node.position.y);
    ctx.lineTo(node.right.position.x, node.right.position.y);
    ctx.stroke();
    draw(node.right);
  }

  if (node.left) {
    ctx.beginPath();
    ctx.lineWidth = 1.4;
    ctx.lineTo(node.position.x, node.position.y);
    ctx.lineTo(node.left.position.x, node.left.position.y);
    ctx.stroke();
    draw(node.left);
  }

  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.arc(node.position.x, node.position.y, 25, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillText(
    value,
    node.position.x - ctx.measureText(value).width / 2,
    node.position.y + 4
  );
}

tree.push(16);
tree.push(8);
tree.push(4);
tree.push(12);
tree.push(2);
tree.push(6);
tree.push(3);
tree.push(5);
tree.push(7);
tree.push(10);
tree.push(14);
tree.push(9);
tree.push(11);
tree.push(13);
tree.push(15);
tree.push(1);

tree.push(24);
tree.push(20);
tree.push(28);
tree.push(18);
tree.push(30);
tree.push(22);
tree.push(26);
tree.push(17);
tree.push(19);
tree.push(21);
tree.push(23);
tree.push(25);
tree.push(27);
tree.push(29);
tree.push(31);

draw(tree.root as TreeNode);

const main_input = document.getElementById("value") as HTMLInputElement;

main_input?.addEventListener("keyup", (event) => {
  var key = event.key;
  if (key === "Enter" && main_input.value) {
    let input_readonly = main_input.cloneNode() as HTMLInputElement;
    input_readonly.setAttribute("readonly", "");
    input_readonly.removeAttribute("id");
    main_input.parentElement?.insertBefore(input_readonly, main_input);
    main_input.value = "";
  }
});
