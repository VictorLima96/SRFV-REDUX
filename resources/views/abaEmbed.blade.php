@extends('padrao')
@section('content')
<div class="d-flex justify-content-center align-items-center py-4">
    <iframe src="{{ $url }}" width="{{ $width }}" height="{{ $height }}" frameborder="0" allowfullscreen></iframe>
</div>
@endsection
