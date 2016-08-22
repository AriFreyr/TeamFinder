using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using TeamFinder.Providers;

namespace TeamFinder.Droid.Activities
{
    [Activity(Label = "LoginActivity", MainLauncher = true )]
    public class LoginActivity : Activity
    {
        protected override void OnCreate( Bundle savedInstanceState )
        {
            base.OnCreate(savedInstanceState);

            var userProvider = new UserProvider();

            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.Login);

            // Get our button from the layout resource,
            // and attach an event to it
            Button button = FindViewById<Button>(Resource.Id.myButton);

            button.Click += delegate {
                var user = userProvider.Login();
                button.Text = string.Format("Logged in as: {0}", user.Username);

                StartActivity(new Intent(Application.Context, typeof(MainActivity)));
            };
        }
    }
}