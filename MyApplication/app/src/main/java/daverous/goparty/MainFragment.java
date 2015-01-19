package daverous.goparty;

import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

/**
 * Created by David on 18/01/2015.
 */
public class MainFragment extends Fragment {

    @Override
    public View OnCreateView(LayoutInflater inflater, ViewGroup container, Bundle saveInstancestate) {
        return inflater.inflate(R.layout.fragment_main_screen,container,false);

    }
}
