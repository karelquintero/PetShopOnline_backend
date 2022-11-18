const mongoose = require ("mongoose");

const PedidoSchema = new mongoose.Schema({
    cliente: {
        nombre: { type:String, required:true },
        direccion: { type:String, required:true },
        email: { type:String, required:true },
        telefono: { type:String, required:true }
    },
    productos : [
        {
            id: { type: String, required: true },
            nombre: { type: String, required: true },
            marca: { type: String, required: true },
            precio: { type: Number, required: true },
            cantidad: { type: Number, required: true },
        }
    ],
    total: { type:Number, required:true },
    estado: { type:String, required:true },
    fecha_pedido: { type: Date, required:true },
    fecha_entrega: { type: Date, required:false },
});

module.exports = mongoose.model("pedidos", PedidoSchema);