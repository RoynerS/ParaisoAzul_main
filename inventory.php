<!-- inventory.php -->
<div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
    <div class="row">
        <ol class="breadcrumb">
            <li><a href="#">
                    <em class="fa fa-home"></em>
                </a></li>
            <li class="active">Inventario</li>
        </ol>
    </div><!--/.row-->

    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">Agregar Artículo al Inventario</div>
                <div class="panel-body">
                    <form id="addInventoryItem" method="POST" action="ajax.php">
                        <div class="form-group">
                            <label>Nombre del Artículo</label>
                            <input type="text" class="form-control" name="item_name" required>
                        </div>
                        <div class="form-group">
                            <label>Tipo de Artículo</label>
                            <select class="form-control" name="item_type" required>
                                <option value="apero">Aperitivo</option>
                                <option value="bebida">Bebida</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Cantidad</label>
                            <input type="number" class="form-control" name="quantity" required>
                        </div>
                        <div class="form-group">
                            <label>Precio</label>
                            <input type="text" class="form-control" name="price" required>
                        </div>
                        <button type="submit" class="btn btn-success">Agregar Artículo</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">Lista de Artículos en Inventario</div>
                <div class="panel-body">
                    <table class="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Nombre del Artículo</th>
                            <th>Tipo</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        include './db.php'; // Asegúrate de incluir la conexión a la base de datos
                        $inventory_query = "SELECT * FROM inventory";
                        $inventory_result = mysqli_query($connection, $inventory_query);
                        while ($item = mysqli_fetch_assoc($inventory_result)) {
                            ?>
                            <tr>
                                <td><?php echo $item['item_name']; ?></td>
                                <td><?php echo $item['item_type']; ?></td>
                                <td><?php echo $item['quantity']; ?></td>
                                <td><?php echo $item['price']; ?></td>
                                <td>
                                    <button class="btn btn-danger" onclick="deleteItem(<?php echo $item['id']; ?>)">Eliminar</button>
                                </td>
                            </tr>
                        <?php } ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>