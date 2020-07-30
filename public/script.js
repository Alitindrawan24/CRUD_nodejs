getData();
async function getData(){
    const response = await fetch('/read');
    const json = await response.json();    
    showData(json);
}

const btnSave = document.getElementById('btn_save');
btnSave.addEventListener('click', async event => {

    const action = btnSave.textContent;
    
    const name   = document.getElementById('name').value;    
    const email   = document.getElementById('email').value;
    const id   = document.getElementById('id').value;

    let data = {     
        id : id,   
        name : name,
        email : email,
        action : action,      
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    
    getData();

    $('#exampleModal').modal('hide');

    if(action === 'Simpan'){
        $.alert('Data Berhasil ditambah!');
    }else{
        $.alert('Data Berhasil dirubah!');
    }
});

function showData(data){
    $('#dataBody').html('');
    let tr = '';
    $.each(data, function(k,v){
        tr = $('<tr/>');
        tr.append("<td>"+(k+1)+"</td>");
        tr.append("<td>"+v.name+"</td>");
        tr.append("<td>"+v.email+"</td>");
        tr.append(`
        <td>
            <button type="button" class="badge badge-primary badge-pill btnEdit" data-id="`+v.id+`"> Edit</button>        
            <button type="button" class="badge badge-danger badge-pill btnHapus" data-id="`+v.id+`"> Hapus</button>
        </td>
        `);
        $('#dataBody').append(tr);
    });

    $(function(){
        $('.btnTambahData').on('click', function(){        
            document.getElementById('name').value = '';  
            document.getElementById('email').value = '';

            $('#exampleModalLabel').html('Tambah Data User');
            $('.modal-footer button[id=btn_save]').html('Simpan');
        });

        $('.btnEdit').on('click', async function(){
            let id = $(this).data('id');
            console.log(id);

            const url = `readbyid/${id}`;
            const response = await fetch(url);
            const json = await response.json();
            
            document.getElementById('id').value = id;
            document.getElementById('name').value = json[0].name;
            document.getElementById('email').value = json[0].email;        

            $('#exampleModalLabel').html('Ubah Data Users');
            $('.modal-footer button[id=btn_save]').html('Ubah Data');
            $('#exampleModal').modal('show');
        });

        $('.btnHapus').on('click', async function(){
            let id = $(this).data('id');

            $.confirm({
                title: 'Hapus Data Users',
                content: 'Apakah Anda Yakin...???',
                buttons: {
                    ya: {
                        text: 'YA',
                        btnClass: 'btn-blue',
                        action: async function(){
                            const url = `hapus/${id}`;
                            const response = await fetch(url);
                            const json = await response.json();
                            $.alert('Data Berhasil dihapus!');
                            getData();
                        }
                    },
                    tidak: function () {
                        
                    }
                }
            });
        });

    });
}