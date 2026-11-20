const resultado = document.getElementById('resultado');
const alerta = document.getElementById('alerta');

const pesos = (valor) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(valor || 0);
const fecha = (valor) => valor ? new Date(valor).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Bogota' }) : '—';
const seguro = (texto) => String(texto ?? '—').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const estrellas = (n) => '★'.repeat(Math.round(n || 0)) + '☆'.repeat(5 - Math.round(n || 0));

const pedir = async (ruta, opciones = {}) => {
  const respuesta = await fetch(ruta, { headers: { 'Content-Type': 'application/json' }, ...opciones });
  const datos = await respuesta.json().catch(() => ({ mensaje: 'Respuesta inválida del servidor' }));
  if (!respuesta.ok) throw { estado: respuesta.status, ...datos };
  return datos;
};

const mostrarError = (fallo) => {
  const campos = Object.entries(fallo.campos || {}).map(([campo, texto]) => `<li>${seguro(campo)}: ${seguro(texto)}</li>`).join('');
  const motor = fallo.motor ? ` <span class="insignia mal">${seguro(fallo.motor)}</span>` : '';
  alerta.className = 'alerta alerta-error';
  alerta.innerHTML = `<strong>Error ${fallo.estado || ''}</strong>${motor}<div>${seguro(fallo.mensaje || 'No se pudo completar la operación')}</div>${campos ? `<ul>${campos}</ul>` : ''}`;
};

const mostrarExito = (texto) => {
  alerta.className = 'alerta alerta-exito';
  alerta.innerHTML = seguro(texto);
};

const cifra = (valor, etiqueta) => `<div class="cifra"><strong>${valor}</strong><span>${etiqueta}</span></div>`;
const crudo = (datos) => `<details><summary>Ver JSON combinado</summary><pre>${seguro(JSON.stringify(datos, null, 2))}</pre></details>`;
const tabla = (columnas, filas) => `<div class="desplazable"><table class="tabla"><thead><tr>${columnas.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${filas.join('') || `<tr><td colspan="${columnas.length}" class="tenue">Sin registros</td></tr>`}</tbody></table></div>`;
const motores = (datos) => `<p class="origen">PostgreSQL: ${seguro(datos.motores.postgresql)} · MongoDB: ${seguro(datos.motores.mongodb)}</p>`;

const vistaResena = (r) => `<div class="resena"><span class="estrellas">${estrellas(r.calificacion)}</span> <strong>${seguro(r.titulo || '')}</strong> <span class="tenue">· ${seguro(r.autor_alias)} · ${fecha(r.fecha)}${r.verificada ? ' · compra verificada' : ''}</span><div>${seguro(r.texto)}</div></div>`;

const vistas = {
  funcion: (d) => `
    <div class="tarjeta">
      <h2>${seguro(d.funcion.pelicula.titulo)} · ${seguro(d.funcion.sala.nombre)}</h2>
      <p class="tenue">${fecha(d.funcion.fecha_hora)} · ${seguro(d.funcion.idioma)} · ${seguro(d.funcion.estado)} · ${seguro(d.funcion.pelicula.clasificacion)}</p>
      ${motores(d)}
      <div class="cifras">
        ${cifra(d.ventas.boletas_vendidas, 'Boletas vendidas (PG)')}
        ${cifra(d.ventas.ocupacion_porcentaje + '%', 'Ocupación (PG)')}
        ${cifra(pesos(d.ventas.recaudo), 'Recaudo (PG)')}
        ${cifra(d.resenas_pelicula.promedio ?? '—', `Promedio de ${d.resenas_pelicula.total} reseñas (Mongo)`)}
        ${cifra(d.resenas_de_asistentes.total, 'Reseñas de asistentes a esta función')}
      </div>
      ${d.ficha_tecnica ? `<h3>Ficha técnica</h3><p>${seguro(d.ficha_tecnica.codigo_pelicula)} · ${seguro(d.ficha_tecnica.titulo_original)} (${d.ficha_tecnica.anio_estreno}) · ${seguro((d.ficha_tecnica.generos || []).join(', '))}</p>` : '<p class="tenue">Sin ficha técnica en MongoDB</p>'}
      <h3>Reseñas de quienes compraron para esta función</h3>
      ${d.resenas_de_asistentes.detalle.map(vistaResena).join('') || '<p class="tenue">Ningún asistente ha reseñado todavía</p>'}
      <h3>Últimas reseñas de la película</h3>
      ${d.ultimas_resenas.map(vistaResena).join('') || '<p class="tenue">Sin reseñas</p>'}
    </div>`,

  pelicula: (d) => `
    <div class="tarjeta">
      <h2>${seguro(d.contrato.titulo_obra)}</h2>
      <p class="tenue">${seguro(d.contrato.artista)} · contrato ${seguro(d.contrato.estado)} hasta ${seguro(d.contrato.fecha_fin)} · ${seguro(d.contrato.clasificacion)}</p>
      ${motores(d)}
      <div class="cifras">
        ${cifra(d.resumen.funciones, 'Funciones (PG)')}
        ${cifra(d.resumen.con_requisitos, 'Con requisitos (Mongo)')}
        ${cifra(d.resumen.listas, 'Preparación lista')}
        ${cifra(d.ficha_tecnica ? d.ficha_tecnica.formatos_disponibles.join(', ') : '—', 'Formatos en la ficha')}
      </div>
      ${d.alertas.length ? `<h3>Alertas del cruce</h3>${d.alertas.map((a) => `<div><span class="insignia alerta">${seguro(a)}</span></div>`).join('')}` : ''}
      <h3>Funciones y su preparación técnica</h3>
      ${tabla(['Función', 'Fecha', 'Sala', 'Estado', 'Formato', 'Proyección', 'Audio', 'Preparación', 'Pendientes'], d.funciones.map((f) => `
        <tr><td>${f.id_funcion}</td><td>${fecha(f.fecha_hora)}</td><td>${seguro(f.sala.nombre)} (${seguro(f.sala.tipo_sala)})</td><td>${seguro(f.estado)}</td>
        <td>${seguro(f.requisitos?.formato)}</td><td>${seguro(f.requisitos?.proyeccion.proyector)}</td><td>${seguro(f.requisitos?.audio.sistema)}</td>
        <td>${f.requisitos ? `<span class="insignia ${f.requisitos.estado_preparacion === 'LISTA' ? 'bien' : 'alerta'}">${seguro(f.requisitos.estado_preparacion)}</span>` : '<span class="insignia mal">Sin documento</span>'}</td>
        <td>${seguro(f.requisitos ? f.requisitos.pasos_pendientes.join(', ') || 'Ninguno' : '—')}</td></tr>`))}
    </div>`,

  cruce: (d) => `
    <div class="tarjeta">
      <h2>Ventas vs incidentes por sala</h2>
      ${motores(d)}
      <div class="cifras">
        ${cifra(d.totales.boletas, 'Boletas pagadas (PG)')}
        ${cifra(pesos(d.totales.recaudo), 'Recaudo (PG)')}
        ${cifra(d.totales.incidentes_en_salas, 'Incidentes en salas (Mongo)')}
        ${cifra(d.totales.incidentes_areas_comunes, 'Incidentes en áreas comunes')}
      </div>
      <h3>Ordenado por incidentes cada mil boletas</h3>
      ${tabla(['Sala', 'Tipo', 'Funciones', 'Boletas', 'Recaudo', 'Incidentes', 'Graves', 'Abiertos', 'Fallas técnicas', 'Min. interrupción', 'Reembolsado', 'x 1000 boletas'], d.salas.map((s) => `
        <tr><td>${seguro(s.nombre)}</td><td>${seguro(s.tipo_sala)}</td><td>${s.funciones}</td><td>${s.boletas}</td><td>${pesos(s.recaudo)}</td>
        <td>${s.incidentes.total}</td><td>${s.incidentes.graves}</td><td>${s.incidentes.abiertos}</td><td>${s.incidentes.fallas_tecnicas}</td>
        <td>${s.incidentes.minutos_interrupcion}</td><td>${pesos(s.incidentes.reembolsado)}</td><td><strong>${s.incidentes_por_mil_boletas ?? '—'}</strong></td></tr>`))}
    </div>`,

  espectador: (d) => `
    <div class="tarjeta">
      <h2>${seguro(d.espectador.nombres)} ${seguro(d.espectador.apellidos)}</h2>
      <p class="tenue">${seguro(d.espectador.tipo_documento)} ${seguro(d.espectador.numero_documento)} · ${seguro(d.espectador.email)}</p>
      ${motores(d)}
      <div class="cifras">
        ${cifra(d.resumen.compras, 'Compras (PG)')}
        ${cifra(d.resumen.boletas, 'Boletas pagadas')}
        ${cifra(pesos(d.resumen.gastado), 'Total gastado')}
        ${cifra(d.resumen.resenas, 'Reseñas (Mongo)')}
        ${cifra(d.resumen.incidentes_reportados, 'Incidentes reportados (Mongo)')}
      </div>
      <h3>Compras</h3>
      ${tabla(['Venta', 'Película', 'Función', 'Boletas', 'Total', 'Canal', 'Estado', 'Comprobante', 'Reseñó'], d.compras.map((c) => `
        <tr><td>${c.id_venta}</td><td>${seguro(c.titulo_obra)}</td><td>${fecha(c.fecha_hora)}</td><td>${c.cantidad} ${seguro(c.tipo_boleta)}</td><td>${pesos(c.total)}</td>
        <td>${seguro(c.canal)}</td><td>${seguro(c.estado)}</td><td>${seguro(c.codigo_comprobante)}</td><td>${c.tiene_resena ? 'Sí' : 'No'}</td></tr>`))}
      <h3>Incidentes</h3>
      ${tabla(['Código', 'Tipo', 'Severidad', 'Estado', 'Descripción'], d.incidentes.map((i) => `
        <tr><td>${seguro(i.codigo_incidente)}</td><td>${seguro(i.tipo)}</td><td>${seguro(i.severidad)}</td><td>${seguro(i.estado)}</td><td>${seguro(i.descripcion)}</td></tr>`))}
    </div>`,

  vender: (d) => `
    <div class="tarjeta">
      <h2>Comprobante ${seguro(d.mongodb.comprobante.codigo_comprobante)}</h2>
      <p class="tenue">${seguro(d.mongodb.comprobante.titulo)} · ${seguro(d.mongodb.comprobante.sala.nombre)} · ${fecha(d.mongodb.comprobante.fecha_funcion)}</p>
      <div class="cifras">
        ${cifra(d.postgresql.venta.id_venta, 'id_venta en ventas (PG)')}
        ${cifra(`${d.postgresql.venta.cantidad} × ${pesos(d.postgresql.venta.valor_unitario)}`, d.postgresql.venta.tipo_boleta)}
        ${cifra(pesos(d.postgresql.venta.total), 'Total')}
        ${cifra(d.mongodb.comprobante.estado, 'comprobantes_venta (Mongo)')}
      </div>
    </div>`,

  anular: (d) => `
    <div class="tarjeta">
      <h2>Venta ${d.postgresql.id_venta} anulada</h2>
      <div class="cifras">
        ${cifra(d.postgresql.estado, 'Estado en ventas (PG)')}
        ${cifra(pesos(d.postgresql.valor_devuelto), 'Valor devuelto')}
        ${cifra(seguro(d.mongodb.reportes_incidentes.codigo_incidente), 'Incidente (Mongo)')}
        ${cifra(d.mongodb.comprobante_actualizado ? 'Sí' : 'No había', 'Comprobante actualizado')}
      </div>
    </div>`
};

const acciones = {
  funcion: (f) => pedir(`/api/funciones/${f.id_funcion}/resenas`),
  pelicula: (f) => pedir(`/api/peliculas/${f.id_contrato}/requisitos`),
  cruce: (f) => pedir(`/api/salas/ventas-incidentes?${new URLSearchParams(Object.entries(f).filter(([, v]) => v))}`),
  espectador: (f) => pedir(`/api/espectadores/${f.id_espectador}/historial`),
  vender: (f) => pedir('/api/ventas', {
    method: 'POST',
    body: JSON.stringify({
      id_espectador: Number(f.id_espectador), id_funcion: Number(f.id_funcion), id_tipo_boleta: Number(f.id_tipo_boleta),
      cantidad: Number(f.cantidad), canal: f.canal, id_staff: f.id_staff ? Number(f.id_staff) : null,
      simular_falla_mongo: f.simular_falla_mongo === 'on'
    })
  }),
  anular: (f) => pedir(`/api/ventas/${f.id_venta}/anulacion`, {
    method: 'POST',
    body: JSON.stringify({ motivo: f.motivo, id_staff: f.id_staff ? Number(f.id_staff) : null })
  })
};

document.querySelectorAll('.formulario').forEach((formulario) => {
  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const accion = formulario.dataset.accion;
    const boton = formulario.querySelector('button');
    boton.disabled = true;
    alerta.innerHTML = '';
    resultado.innerHTML = '';
    try {
      const datos = await acciones[accion](Object.fromEntries(new FormData(formulario)));
      if (datos.mensaje) mostrarExito(datos.mensaje);
      resultado.innerHTML = vistas[accion](datos) + `<div class="tarjeta">${crudo(datos)}</div>`;
      if (accion === 'vender') {
        document.querySelector('[name="id_venta"]').value = datos.postgresql.venta.id_venta;
        cargarCartelera();
      }
    } catch (fallo) {
      mostrarError(fallo.estado ? fallo : { mensaje: 'No hay conexión con la API' });
    } finally {
      boton.disabled = false;
    }
  });
});

document.querySelectorAll('#pestanas button').forEach((boton) => {
  boton.addEventListener('click', () => {
    document.querySelectorAll('#pestanas button').forEach((b) => b.classList.toggle('activa', b === boton));
    document.querySelectorAll('.panel').forEach((p) => p.classList.toggle('activo', p.id === `panel-${boton.dataset.panel}`));
    alerta.innerHTML = '';
    resultado.innerHTML = '';
  });
});

const cargarEstado = async () => {
  const contenedor = document.getElementById('motores');
  try {
    const respuesta = await fetch('/api/estado');
    const datos = await respuesta.json();
    contenedor.innerHTML = Object.entries(datos).map(([motor, info]) =>
      `<span class="insignia ${info.conectado ? 'bien' : 'mal'}">${motor === 'postgresql' ? 'PostgreSQL' : 'MongoDB'} · ${seguro(info.conectado ? info.version : info.mensaje)}</span>`).join('');
  } catch {
    contenedor.innerHTML = '<span class="insignia mal">API no disponible</span>';
  }
};

const cargarCatalogos = async () => {
  try {
    const datos = await pedir('/api/catalogos');
    document.querySelectorAll('[data-catalogo]').forEach((select) => {
      const vacio = select.dataset.vacio ? `<option value="">${seguro(select.dataset.vacio)}</option>` : '';
      select.innerHTML = vacio + datos[select.dataset.catalogo].map((item) => {
        const [id, nombre] = Object.values(item);
        return `<option value="${id}">${id} · ${seguro(nombre)}</option>`;
      }).join('');
    });
  } catch (fallo) {
    mostrarError(fallo);
  }
};

const cargarCartelera = async () => {
  try {
    const funciones = await pedir('/api/cartelera');
    document.getElementById('cartelera').innerHTML = funciones.map((f) =>
      `<option value="${f.id_funcion}">${f.id_funcion} · ${seguro(f.titulo_obra)} · ${seguro(f.sala)} · ${fecha(f.fecha_hora)} · ${f.disponibles} sillas · ${pesos(f.precio_base)}</option>`).join('')
      || '<option value="">No hay funciones futuras: ejecuta preparar_demo.py</option>';
  } catch {
    document.getElementById('cartelera').innerHTML = '<option value="">Cartelera no disponible</option>';
  }
};

cargarEstado();
cargarCatalogos();
cargarCartelera();
