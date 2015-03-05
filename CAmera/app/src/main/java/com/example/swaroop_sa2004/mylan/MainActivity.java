package com.example.swaroop_sa2004.mylan;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import java.io.File;
import java.io.IOException;


public class MainActivity extends Activity {
    int TAKE_PHOTO_CODE = 0;
    public static int count=0;
    private TextView myText = null;
    private static final String TAG = "camera";
    private String selectedImagePath;
    private String pictureName;
    private String bob="/sdcard/Pictures/picFolder/";


    String token="";
    //HttpResponse<JsonNode> response;
   // response;

    private static final int CAMERA_REQUEST = 1888;
    private ImageView imageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final String dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES) + "/picFolder/";
        File newdir = new File(dir);
        newdir.mkdirs();

        Button capture = (Button) findViewById(R.id.btnCapture);
        capture.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {

                // here,counter will be incremented each time,and the picture taken by camera will be stored as 1.jpg,2.jpg and likewise.
                count++;
                String file =dir+count+"1.jpg";
                pictureName=file;
                File newfile = new File(file);
                try {
                    newfile.createNewFile();
                } catch (IOException e) {}

                Uri outputFileUri = Uri.fromFile(newfile);

                Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, outputFileUri);

                startActivityForResult(cameraIntent, TAKE_PHOTO_CODE);
            }
        });
    }






    protected void onActivityResult (int requestCode, int resultCode, Intent data)   {
        super.onActivityResult(requestCode, resultCode, data);
        Context context = getApplicationContext();

        if (requestCode == TAKE_PHOTO_CODE && resultCode == RESULT_OK) {
       //     String filePath=bob+pictureName;
        //    String token = "";
                String result="";
            Log.d("PARSER", "Inside Parser");
                    try {
                       // Toast.makeText(MainActivity.this, "jjjjjjjj", Toast.LENGTH_LONG).show();

                        HttpResponse<JsonNode> response = Unirest.get("https://camfind.p.mashape.com/image_responses/9JKAWHKGLjqMdDKDNIJQfg")
                                .header("X-Mashape-Key", "CcNosstob8mshcFonhj8xVE1fUj5p1RDNvpjsnLvqOOkpmdLdj")
                                .asJson();
                        Log.d(TAG, "it works");
                        String result=response.getBody().getString();
                        Toast.makeText(MainActivity.this,result , Toast.LENGTH_LONG).show();

                        result = response.getBody().toString();
                    } catch (UnirestException e) {
                        Log.d(TAG, "Couldn't get reponse");
                        e.printStackTrace();
                    }

                }
            }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
