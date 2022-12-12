<?php

namespace App\Http\Controllers;

use App\Models\Pendonor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataPendonor extends Controller
{
    public function queryDb()
    {
        return  $pendonor = DB::table('pendonors')
            ->select(
                DB::raw('pendonors.email'),
                DB::raw('pendonors.nama'),
                DB::raw('count(pendonors.nama) as total'),
                DB::raw('pendonors.telp'),
                DB::raw('pendonors.alamat'),
            )
            ->groupBy(
                DB::raw('pendonors.email'),
                DB::raw('pendonors.nama'),
                DB::raw('pendonors.telp'),
                DB::raw('pendonors.alamat'),
            )
            ->leftJoin('registrasi_donors', 'pendonors.id', '=', 'registrasi_donors.pendonor_id')
            ->leftJoin('proses_registrasi_donors', 'proses_registrasi_donors.registrasi_donor_id', '=', 'registrasi_donors.id')
            ->where('proses_registrasi_donors.status', '=', 'berhasil')
            ->whereMonth('proses_registrasi_donors.created_at', Carbon::now()->format('m'));
    }
    public function index(Request $req)
    {
        $pendonor = [];

        if ($req->search == '') {
            $pendonor = $this->queryDb()->paginate($req->perpage ? $req->perpage : 10);
        } else {
            $pendonor = $this->queryDb()->where('pendonors.nama', 'like', '%' . $req->search . '%')

                ->paginate($req->perpage ? $req->perpage : 10);
        }
        // $count = DB::table('registrasi_donors')->select(DB::raw('jenis_donor as jenis'), 
        // DB::raw('count(jenis_donor) as total'))->groupBy(DB::raw('jenis_donor'))->get();

        return inertia('Backend/DataPendonor/Index', ['pendonors' => $pendonor]);
        // return inertia('Backend/EventDonor/EventDonor', compact('event'));
    }
    public function getData($id)
    {

        $pendonor = Pendonor::where('id', $id)->get();
        // dd($pendonor);
    }
}
