<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHtml5VersionProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apps_html5_version_providers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('app_id')->unsigned();            
            $table->string('url');
            $table->string('xpath');
            $table->string('regex');            
            $table->timestamps();
            $table->foreign('app_id')->references('id')->on('apps');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('apps_html5_version_providers');
    }
}
