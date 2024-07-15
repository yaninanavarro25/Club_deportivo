import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
}); 

router.get("/agregar", (req, res) => {
  const { nombre, precio } = req.query;
  const objectDeport = {
    nombre,
    precio,
  }; 

  const { deportes } = JSON.parse(
    fs.readFileSync(__dirname + "/data/deportes.json", "utf-8")
  ); 
  deportes.push(objectDeport);
  fs.writeFileSync(__dirname + "/data/deportes.json", JSON.stringify({deportes}));
  res.send("deporte agregado con éxito");
});

router.get("/deportes", (req, res) => {
  res.sendFile(__dirname + "/data/deportes.json");
}); 

router.get("/editar", (req, res) => {
  const { nombre, precio } = req.query; 
  const deportJSON = fs.readFileSync(__dirname + "/data/deportes.json", "utf-8")
  const { deportes } = JSON.parse(deportJSON); 
  const index = deportes.findIndex((d) => d.nombre === nombre); 
  deportes[index].precio = precio; 
  fs.writeFileSync(__dirname + "/data/deportes.json", JSON.stringify({deportes})); 
  res.send("deporte editado con éxito");
  

})

router.get("/eliminar", (req, res) => {
  const { nombre } = req.query; 
  const deportJSON = fs.readFileSync(__dirname + "/data/deportes.json", "utf-8")
  const { deportes } = JSON.parse(deportJSON); 
  const index = deportes.findIndex((d) => d.nombre === nombre); 
  deportes.splice(index, 1); 
  fs.writeFileSync(__dirname + "/data/deportes.json", JSON.stringify({deportes})); 
  res.send("deporte eliminado con válido");
})
export default router;