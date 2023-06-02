<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\AllPostsCollection;
use App\Models\Post;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $posts = Post::orderBy('created_at', 'desc')->get();
            return response()->json(new AllPostsCollection($posts), 200);
        } catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
