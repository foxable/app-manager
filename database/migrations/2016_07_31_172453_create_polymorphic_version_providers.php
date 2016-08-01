<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePolymorphicVersionProviders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('version_providers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('provider_id')->unsigned();
            $table->string('provider_type');  
        });
        
        Schema::rename('apps_html5_version_providers', 'html5_version_providers');

        Schema::table('html5_version_providers', function (Blueprint $table) {
            $table->dropColumn('app_id');
        });
        
        Schema::table('html5_version_providers', function (Blueprint $table) {
            $table->dropColumn('created_at');
        });
        
        Schema::table('html5_version_providers', function (Blueprint $table) {
            $table->dropColumn('updated_at');
        });

        Schema::create('static_version_providers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('latest_version');
        });      
        
        Schema::table('apps', function (Blueprint $table) {
            $table->renameColumn('version_provider', 'version_provider_id');
            $table->integer('version_provider_id')->unsigned();
            $table->foreign('version_provider_id')->references('id')->on('version_providers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('version_providers');       
        
        Schema::table('html5_version_providers', function (Blueprint $table) {
            $table->integer('app_id')->unsigned();
        });
        
        Schema::rename('html5_version_providers', 'apps_html5_version_providers');
        
        Schema::drop('static_version_providers');
        
        Schema::table('apps', function (Blueprint $table) {
            $table->dropForeign(['version_provider_id']);
            $table->string('version_provider');
            $table->renameColumn('version_provider_id', 'version_provider');            
        });
    }
}
