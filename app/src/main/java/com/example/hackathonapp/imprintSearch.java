package com.example.hackathonapp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import android.app.Activity;
import android.content.Context;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class imprintSearch extends Activity {
	/** Called when the activity is first created. */
    public EditText etResponse; //= (EditText) findViewById(R.id.editText2);
    @Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		String s=getString(R.string.search_string);
		getActionBar().setTitle(s);
		setContentView(R.layout.imprint_search);
        etResponse = (EditText) findViewById(R.id.editText2);
	}

	public void searchReturn(View view) {
	    // Do something in response to button
	    EditText searchquery = (EditText) findViewById(R.id.editText1);
	    String message=searchquery.getText().toString();
			String url="172.26.162.55:3000/imprint/";
			String newurl=url+message;
			Context context = getApplicationContext();
			CharSequence text = newurl;
			int duration = Toast.LENGTH_SHORT;
			Toast toast = Toast.makeText(context, text, duration);
			toast.show();
			String text1=GET(newurl);
			//Toast.makeText(context, text1, duration).show();
						
	}
	
    public static String GET(String url){
        InputStream inputStream = null;
        String result = "";
        try {
 
            // create HttpClient
            HttpClient httpclient = new DefaultHttpClient();
 
            // make GET request to the given URL
            HttpResponse httpResponse = httpclient.execute(new HttpGet(url));
 
            // receive response as inputStream
            inputStream = httpResponse.getEntity().getContent();
 
            // convert inputstream to string
            if(inputStream != null)
                result = convertInputStreamToString(inputStream);
            else
                result = "Did not work!";
 
        } catch (Exception e) {
            Log.d("InputStream", e.getLocalizedMessage());
        }
 
        return result;
    }
 
    private static String convertInputStreamToString(InputStream inputStream) throws IOException{
        BufferedReader bufferedReader = new BufferedReader( new InputStreamReader(inputStream));
        String line = "";
        String result = "";
        while((line = bufferedReader.readLine()) != null)
            result += line;
 
        inputStream.close();
        return result;
 
    }

		    
		    private class HttpAsyncTask extends AsyncTask<String, Void, String> {
		        @Override
		        protected String doInBackground(String... urls) {
		 
		            return GET(urls[0]);
		        }
		        // onPostExecute displays the results of the AsyncTask.
		        @Override
		        protected void onPostExecute(String result) {
		            Toast.makeText(getBaseContext(), "Received!", Toast.LENGTH_LONG).show();
		            etResponse.setText(result);
		       }
		    }
		 
}
