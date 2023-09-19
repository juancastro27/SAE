import { pool } from '../db.js'


export const getPedidos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pedidos');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Algo va mal' });
  }
}

export const getPedido = async (req, res) => {
  const productId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [productId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Algo va mal' });
  }
}


  export const createPedidos = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    try {
      await pool.query('INSERT INTO pedidos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)', [nombre, descripcion, precio, stock]);
      res.json({ message: 'Pedido agregado correctamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal' });
    }
  }

  export const updatePedidos = async (req, res) => {
    const productId = req.params.id;
    const { nombre, descripcion, precio, stock } = req.body;
    try {
      let query = 'UPDATE pedidos SET ';
      const values = [];
  
      if (nombre) {
        query += 'nombre = ?, ';
        values.push(nombre);
      }
  
      if (descripcion) {
        query += 'descripcion = ?, ';
        values.push(descripcion);
      }
  
      if (precio) {
        query += 'precio = ?, ';
        values.push(precio);
      }
  
      if (stock) {
        query += 'stock = ?, ';
        values.push(stock);
      }
  
      query = query.slice(0, -2) + ' WHERE id = ?';
      values.push(productId);
  
      const result = await pool.query(query, values);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Pedido no encontrado.' });
      }
  
      res.json({ message: 'Pedido actualizado correctamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal' });
    }
  }


  export const deletePedidos = async (req, res) => {
    const productId = req.params.id;
    try {
      const result = await pool.query('DELETE FROM pedidos WHERE id = ?', [productId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Pedido no encontrado.' });
      }
      res.json({ message: 'Pedido eliminado correctamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal' });
    }
  }