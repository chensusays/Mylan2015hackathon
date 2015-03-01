package com.example.hackathonapp;

import android.app.ActionBar.LayoutParams;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
//import android.view.Menu;

public class Menu extends Activity {
	
	public static int count;
	public static final Button[] myButton =new Button[10];
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_menu);
	}

	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		//getMenuInflater().inflate(R.menu.menu, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}
	
	public void viewMyProfile(View view, int count1) {
	    // Do something in response to button
		count1=count1+0;
		Intent intent = new Intent(this, viewProfile.class);
		startActivity(intent);
	}
	
	public void addProfile(View view) {
	    // Do something in response to button
		count++;
		myButton[count] = new Button(this);
		myButton[count].setText("Person"+count);
		LinearLayout ll = new LinearLayout(this);
		LayoutParams lp = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
		ll.addView(myButton[count], lp);
		final LinearLayout lm = (LinearLayout) findViewById(R.id.profileLayout);
		lm.addView(ll);
		//add some stuff for the on click method.
		myButton[count].setOnClickListener(new View.OnClickListener() {

			public void onClick(View v) {
				// TODO Auto-generated method stub
				viewMyProfile(v,count);
				
			}

			  });
	}
	
}
