-- Print IP address
ip = wifi.sta.getip()  
print(ip)

-- Configure the ESP as a station (client)
wifi.setmode(wifi.STATION)  
wifi.sta.config("Rabbitfoot 4G", "24552690")  
wifi.sta.autoconnect(1)

-- Create a server
-- and set 30s time out for a inactive client
sv = net.createServer(net.TCP, 30)

-- Server listen on 80
-- Print HTTP headers to console
sv:listen(80, function(c)  
    c:on("receive", function(conn, payload)
        print(payload)

        if (string.find(payload, "/1/weather") ~= nil) then
            data = "{" ..
                  "\"value\":" ..
                  adc.read(0) ..
                  "," ..
                  "\"lat\":25.05" ..
                  "," ..
                  "\"lon\":121.51" ..
                  "}\n"
                  
            hash = crypto.toHex( crypto.hash("sha1", data) )
         
            buf = "HTTP/1.1 200 OK\n" ..
                  "Content-Type: application/json\n" ..
                  "Cache-Control: public, max-age=31536000\n" ..
                  "Etag: " ..
                  hash ..
                  "\n\n" ..
                  data
                  
            conn:send(buf, function(conn)
                conn:close()
            end)
        end
    end)
end)
