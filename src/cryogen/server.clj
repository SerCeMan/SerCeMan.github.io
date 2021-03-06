(ns cryogen.server
  (:require [compojure.core :refer [GET defroutes]]
            [compojure.route :as route]
            [ring.util.response :refer [redirect resource-response]]
            [ring.util.codec :refer [url-decode]]
            [cryogen-core.watcher :refer [start-watcher!]]
            [cryogen.core :refer [load-all-plugins]]
            [cryogen-core.compiler :refer [compile-assets-timed read-config]]
            [ring.server.standalone :as ring]
            [ring.middleware.reload :refer [wrap-reload]]
            [cryogen-core.io :refer [path]]))

(defn init []
  (load-all-plugins)
  (compile-assets-timed)
  (let [ignored-files (-> (read-config) :ignored-files)]
    (start-watcher! "resources/templates" ignored-files compile-assets-timed)))


(defn wrap-subdirectories
  [handler]
  (fn [request]
    (let [req-uri (.substring (url-decode (:uri request)) 1)
          res-path (path req-uri (when (:clean-urls? (read-config)) "index.html"))]
      (or (resource-response res-path {:root "public"})
          (handler request)))))

(defroutes routes
           (GET "/" [] (redirect (let [config (read-config)]
                                   (path (:blog-prefix config) "/"
                                         (when-not (:clean-urls? config) "index.html")))))
           (route/resources "/")
           (route/not-found "Page not found"))

(def handler (-> routes
                 (wrap-subdirectories)))

(comment

  (init)

  (ring/serve handler {:port          3000
                       :auto-refresh? true
                       :reload-paths  ["src" "resources"]
                       :init          init})

  )
