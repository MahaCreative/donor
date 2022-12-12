<?php

use App\Http\Controllers\Auth\RegistrasiDonorController as AuthRegistrasiDonorController;
use App\Http\Controllers\DarahController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataPendonor;
use App\Http\Controllers\EmailVerificationRequestController;
use App\Http\Controllers\EvenDonorController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\Guest\EventDonor;
use App\Http\Controllers\Guest\Pendonor;
use App\Http\Controllers\Guest\SyaratDonor;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\PermintaanDarahController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProsesDonorController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RegistrasiDonorController;
use App\Models\RegistrasiDonor;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Email Verivication
Route::middleware('auth')->group(function () {
    Route::get('email/verify/{id}/{hash}', [EmailVerificationRequestController::class, 'index'])->name('verification.verify');
    Route::get('email/verify', [EmailVerificationRequestController::class, 'email_verify'])->name('verification.notice');
    Route::get('email/verification-notification', [EmailVerificationRequestController::class, 'resend_email'])->name('resend')->middleware('throttle:6,1');

    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::get('registrasi-donor', [RegistrasiDonorController::class, 'index'])->name('registrasi-donor');
    Route::post('check-registrasi-donor', [RegistrasiDonorController::class, 'check'])->name('check-registrasi-donor');
    Route::post('registrasi-donor', [RegistrasiDonorController::class, 'store']);


    Route::get('admin/data-registrasi-donor', [AuthRegistrasiDonorController::class, 'index'])->name('admin-registrasi-donor');
    Route::post('admin/data-registrasi-donor', [AuthRegistrasiDonorController::class, 'store']);
    Route::put('admin/data-registrasi-donor/{id}', [AuthRegistrasiDonorController::class, 'update'])->name('admin-registrasi-donor-update');
    Route::delete('admin/data-registrasi-donor/{kode}', [AuthRegistrasiDonorController::class, 'delete'])->name('admin-registrasi-donor-delete');

    Route::get('admin/proses-registrasi-donor', [ProsesDonorController::class, 'index'])->name('proses-donor');
    Route::get('admin/proses-registrasi/{kd_registrasi}', [ProsesDonorController::class, 'proses'])->name('proses-registrasi');
    Route::post('admin/proses-registrasi', [ProsesDonorController::class, 'store'])->name('store-proses-registrasi');
    Route::patch('admin/update-proses-registrasi/{id}', [ProsesDonorController::class, 'update'])->name('update-proses-registrasi');
    Route::delete('admin/delete-proses-registrasi/{id}', [ProsesDonorController::class, 'delete'])->name('delete-proses-registrasi');



    Route::get('admin/event-donor', [EvenDonorController::class, 'index'])->name('admin-event-donor');
    Route::post('admin/event-donor', [EvenDonorController::class, 'store']);
    Route::put('admin/event-donor/update/{id}', [EvenDonorController::class, 'update'])->name('admin-event-donor-update');
    Route::delete('admin/event-donor/{id}', [EvenDonorController::class, 'delete'])->name('admin-event-donor-delete');

    Route::get('admin/data-pendonor', [DataPendonor::class, 'index'])->name('admin-data-pendonor');
    Route::get('admin/data-pendonor/{id}', [DataPendonor::class, 'getData'])->name('admin-get-data-pendonor');

    // Darah 
    Route::get('admin/data-darah', [DarahController::class, 'index'])->name('data-darah');

    // Permintaan Darah
    Route::get('admin/permintaan-darah', [PermintaanDarahController::class, 'index'])->name('permintaan-darah');
    Route::post('admin/permintaan-darah', [PermintaanDarahController::class, 'store']);
    Route::put('admin/permintaan-darah/{id}', [PermintaanDarahController::class, 'update'])->name('permintaan-darah-update');
    Route::delete('admin/permintaan-darah/{id}', [PermintaanDarahController::class, 'delete'])->name('permintaan-darah-delete');
    Route::get('admin/permintaan-darah/search', [PermintaanDarahController::class, 'search'])->name('permintaan-darah-search');

    // Proses Permintaan Darah


    // Profiles
    Route::get('profile', [ProfileController::class, 'index'])->name('profile');
    Route::post('profile', [ProfileController::class, 'store']);
    Route::put('profile', [ProfileController::class, 'update']);

    Route::middleware('signed')->group(function () {
    });
    Route::get('logout', LogoutController::class)->name('logout');
});


Route::get('', HomeController::class)->name('home');
Route::get('event-donor', [EventDonor::class, 'index'])->name('event-donor');
Route::get('syarat-donor', [SyaratDonor::class, 'index'])->name('syarat-donor');










// Lupa password
Route::get('forgot-password', [ForgotPasswordController::class, 'index'])->name('forgot_password');
Route::post('forgot-password', [ForgotPasswordController::class, 'email_store']);
Route::get('reset-password/{token}', [ForgotPasswordController::class, 'reset_password'])->name('password.reset');
Route::post('reset-password-store', [ForgotPasswordController::class, 'reset_password_store'])->name('password.update');




Route::middleware('guest')->group(function () {
    Route::get('login', LoginController::class)->name('login');
    Route::post('login', [LoginController::class, 'store']);
    Route::get('register', [RegisterController::class, 'index'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);
});
