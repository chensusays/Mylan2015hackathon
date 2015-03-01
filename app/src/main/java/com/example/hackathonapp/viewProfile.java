package com.example.hackathonapp;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class viewProfile extends Activity {

	/** Called when the activity is first created. */
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.profile);
		Intent intent=getIntent();
		//String message = intent.getStringExtra(Integer.toString(2));
		String message="YOLO";
		final TextView lm = (TextView) findViewById(R.id.textView1);
		lm.setText(message);
		
}
	public void search(View view) {
	    // Do something in response to button
		Intent intent = new Intent(this, imprintSearch.class);
		startActivity(intent);
	}
}