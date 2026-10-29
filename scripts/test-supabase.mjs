const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wfixipzrwnwqgxwndajh.supabase.co';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY || anonKey;

console.log('Testing Supabase REST API connection...');

async function testFetch() {
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/products?select=*`, {
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
      },
    });

    console.log('HTTP Status:', res.status, res.statusText);
    const body = await res.text();
    console.log('Response body:', body);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

testFetch();
