@extends('padrao')
@section('content')
<!-- inicio formulario -->
<div class="container m-4">
<form method="get" action="{{route('todosUsuario')}}">
<div class="row g-3 align-items-center">
    <div class="col-auto">
        <label for="inputcodigo" class="col-form-label">Digite o Nome</label>
    </div>
    <div class="col-auto">
        <input type="text" id="inputcodigo" name="nomeUsuario" class="form-control" aria-describedby="passwordHelpInline">
    </div>
    <div class="col-auto">
         <button type="submit" class="btn btn-primary">Buscar</button>
    </div>
</div>
</form>  
<!--fim formulario -->

<!--inicio tabela-->
<hr>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Nome</th>
      <th scope="col">CPF</th>
      <th scope="col">Email</th>
      <th scope="col">Senha</th>
      <th scope="col">Change</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    @foreach($usuarios as $usuariosArray)
    <tr>
      <th scope="row">{{$usuariosArray->id}}</th>
      <td>{{$usuariosArray->nomeUsuario}}</td>
      <td>{{$usuariosArray->emailUsuario}}</td>
      <td>{{$usuariosArray->senhaUsuario}}</td>
      
    <td>
      <a href="{{route('formulario-Alterar-senha',$usuariosArray->id)}}">
        <button type="button" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
        </svg></button>
      </a>
    </td>
    <td>
        <form method="POST" action="{{route('delete-contato',$usuariosArray->id)}}">
        @method('delete')
        @csrf
        <button type="submit" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
        </svg>
      </button>
      </form>
    </td>
    </tr>

    @endforeach
  </tbody>
</table>

<div class="card-group">
  <div class="card">
    <img src="../images/br2.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Segurança</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    <div class="card-footer">

    </div>
  </div>
  <div class="card">
    <img src="../images/br3.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Saúde</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
    </div>
    <div class="card-footer">

    </div>
  </div>
  <div class="card">
    <img src="../images/br1.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Educação</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
    </div>
    <div class="card-footer">

    </div>
  </div>
</div>


<!--fim tabela-->

</div>
@endsection
