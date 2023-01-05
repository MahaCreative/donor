<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $nama, $jumlahDarah, $namaPendonor, $pesan, $golongan_darah;
    public function __construct($nama, $jumlahDarah, $namaPendonor, $pesan, $golongan_darah)
    {
        $this->nama = $nama;
        $this->jumlahDarah = $jumlahDarah;
        $this->namaPendonor = $namaPendonor;
        $this->pesan = $pesan;
        $this->golongan_darah = $golongan_darah;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $darah = '';
        if ($this->golongan_darah == 1) {
            $darah = 'A';
        } else if ($this->golongan_darah == 2) {
            $darah = 'A+';
        } else if ($this->golongan_darah == 3) {
            $darah = 'B';
        } else if ($this->golongan_darah == 4) {
            $darah = 'B+';
        } else if ($this->golongan_darah == 5) {
            $darah = 'AB';
        } else if ($this->golongan_darah == 6) {
            $darah = 'AB+';
        } else if ($this->golongan_darah == 7) {
            $darah = 'O';
        } else if ($this->golongan_darah == 8) {
            $darah = 'O+';
        }
        return  $this->from('rsuddonor@gmail.com')
            ->view('email.permintaan')
            ->with([
                'nama' => $this->nama,
                'nama_pendonor' => $this->namaPendonor,
                'golongan_darah' => $darah,
                'jumlah_darah' => $this->jumlahDarah,
                'pesan' => $this->pesan
            ]);
    }
}
