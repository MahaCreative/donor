<?php

namespace App\Http\Controllers;

use App\Models\EvenDonor;
use Illuminate\Http\Request;

class EvenDonorController extends Controller
{
    public function index(Request $req)
    {
        $search = $req->search;
        if ($search) {
            $event = EvenDonor::where('judul_even', 'like', '%' . $search . '%')->latest()->get();
        } else {
            $event = EvenDonor::latest()->get();
        }


        return inertia('Backend/EventDonor/EventDonor', compact('event'));
    }

    public function store(Request $req)
    {

        // $attr = $req->validate([
        //     'judul_event' => 'required|min:6',
        //     'tempat' => 'required|min:6',
        //     'tanggal_event' => 'required|date|after:tomorrow',
        //     'waktu_event' => 'required',
        // ]);
        $countEvent = EvenDonor::count();
        $url = $req->file('thumbnail') ? $req->file('thumbnail')->storeAs('images/event', $req->file('thumbnail')->getClientOriginalName()) : null;
        $event = EvenDonor::create([
            'kode_event' => 'ED-' . now()->format('d-m-Y') . 'No-' . ($countEvent + 1),
            'judul_even' => $title = $req->judul_event,
            'kontent' => $req->kontent,
            'slug' => \Str::slug($title),
            'tempat' => $req->tempat,
            'tanggal_event' => $req->tanggal_event,
            'penyelenggara' => $req->penyelenggara,
            'waktu_event' => $req->waktu_event,
            'thumbnail' => $url,
            'status_event' => true,
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Mennambah Data'
        ]);
    }

    public function update($id, Request $req)
    {
        // dd($req->data['judul_event']);
        $eventDonor = EvenDonor::findOrFail($id);
        // $attr = $req->validate([
        //     'judul_event' => 'required|min:6',
        //     'tempat' => 'required|min:6',
        //     'tanggal_event' => 'required|date|after:tomorrow',
        //     'waktu_event' => 'required',
        // ]);
        $url = $req->file('thumbnail') ? $req->file('thumbnail')->storeAs('images/event', $req->file('thumbnail')->getClientOriginalName()) : $eventDonor->thumbnail;
        $eventDonor->update([
            'judul_even' => $title = $req->data['judul_event'],
            'kontent' => $req->data['kontent'],
            'tempat' => $req->data['tempat'],
            'tanggal_event' => $req->data['tanggal_event'],
            'penyelenggara' => $req->data['penyelenggara'],
            'waktu_event' => $req->data['waktu_event'],
            'thumbnail' => $url,
            'status_event' => true,
        ]);
        // dd($req->all());
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Mengedit Data'
        ]);
    }

    public function delete($id)
    {
        $even = EvenDonor::findOrFail($id);
        $even->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Menghapus Data'
        ]);
    }
}
