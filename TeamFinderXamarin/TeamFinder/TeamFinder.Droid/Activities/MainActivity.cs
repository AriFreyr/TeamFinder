using System;

using Android.App;
using Android.Content;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;
using TeamFinder.Providers;

namespace TeamFinder.Droid
{
	[Activity (Label = "TeamFinder.Droid", Icon = "@drawable/icon")]
	public class MainActivity : Activity
	{

		protected override void OnCreate (Bundle bundle)
		{
			base.OnCreate (bundle);

            SetContentView(Resource.Layout.Main);


        }
    }
}


